import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import * as yup from 'yup';
import IShopsRepository from '@modules/establishment/repositories/IShopsRepository';
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
export class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('ProductsShopsRepository')
    private productsShopsRepository: IProductsShopsRepository,

    @inject('ShopsRepository')
    private shopsRepository: IShopsRepository,
  ) {}

  public async execute({
    codigo_barras,
    nome,
    qt_fracionado,
    tp_embalagem,
    infoLojas,
  }: IRequestProduct): Promise<Product> {
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

    if (!infoLojas || infoLojas.length === 0) {
      throw new AppError('Nenhuma informação referente a loja informada!', 422);
    }
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

    const existBarCode = await this.productsRepository.findByBarCode(
      codigo_barras,
    );

    if (existBarCode) {
      throw new AppError(
        `O produto "${existBarCode.nome}" já esta cadastrado com esse código de barras.`,
        422,
      );
    }

    const product = await this.productsRepository.create({
      codigo_barras,
      nome,
      qt_fracionado,
      tp_embalagem,
    });

    const dataProductShop = infoLojas.map(item => ({
      ...item,
      id_produto: product.id,
      qt_estoque: item.qt_estoque || 1,
    }));

    await this.productsShopsRepository.create(dataProductShop);

    return product;
  }
}
