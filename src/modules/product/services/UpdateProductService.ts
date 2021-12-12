import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import * as yup from 'yup';
import IShopsRepository from '@modules/establishment/repositories/IShopsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';
import IProductsShopsRepository from '../repositories/IProductsShopsRepository';

interface IResquestProductShop {
  id_loja: number;
  valor: number;
  qt_estoque: number;
}

interface IRequestProduct {
  nome: string;
  qt_fracionado: number;
  codigo_barras: number;
  tp_embalagem: string;
  infoLojas: IResquestProductShop[];
}

@injectable()
export class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('ProductsShopsRepository')
    private productsShopsRepository: IProductsShopsRepository,

    @inject('ShopsRepository')
    private shopsRepository: IShopsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(
    id_produto: number,
    user_id: number,
    {
      codigo_barras,
      nome,
      qt_fracionado,
      tp_embalagem,
      infoLojas,
    }: IRequestProduct,
  ): Promise<Product> {
    const schema = yup.object().shape({
      nome: yup.string().required('Nome do produto não informado'),
      qt_fracionado: yup
        .number()
        .required('Quantidade fracionada não informada'),
      codigo_barras: yup.number().required('Código de barras não informada'),
      tp_embalagem: yup.string().required('Tipo de embalagem não informada'),
    });

    // Caso houver algum erro retorna com status 422
    await schema
      .validate({
        codigo_barras,
        nome,
        qt_fracionado,
        tp_embalagem,
      })
      .catch(err => {
        throw new AppError(err.message, 422);
      });

    // Verifica se tem alguma loj informada com o valor de venda zerado
    const shopWithoutPrice = infoLojas.find(
      loja => loja.id_loja > 0 && loja.valor === 0,
    );

    if (shopWithoutPrice) {
      throw new AppError(
        `Produto sem valor de venda na loja ${shopWithoutPrice.id_loja}`,
        422,
      );
    }

    // eslint-disable-next-line no-plusplus
    // eslint-disable-next-line no-restricted-syntax
    for (const loja of infoLojas) {
      // eslint-disable-next-line no-await-in-loop
      const shopExist = await this.shopsRepository.findById(loja.id_loja);

      if (!shopExist) {
        throw new AppError('Loja informada não existe', 422);
      }
    }

    const productUpdate = await this.productsRepository.findById(id_produto);

    if (!productUpdate) {
      throw new AppError('Erro ao atualizar produto', 400);
    }

    productUpdate.codigo_barras = codigo_barras;
    productUpdate.nome = nome;
    productUpdate.qt_fracionado = qt_fracionado;
    productUpdate.tp_embalagem = tp_embalagem;

    await this.productsRepository.save(productUpdate);

    const dataProductShop = infoLojas.map(item => ({
      ...item,
      id_produto,
      qt_estoque: item.qt_estoque || 1,
    }));

    const user = await this.usersRepository.findById(user_id);

    if (user.id_estabelecimento > 0) {
      const shops = await this.shopsRepository.findAllEstablishment(
        user.id_estabelecimento,
      );

      // eslint-disable-next-line no-restricted-syntax
      for (const shop of shops) {
        this.productsShopsRepository.deleteByIdAndShop(id_produto, shop.id);
      }
    } else {
      this.productsShopsRepository.deleteById(id_produto);
    }

    await this.productsShopsRepository.create(dataProductShop);

    return productUpdate;
  }
}
