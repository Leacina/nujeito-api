import { inject, injectable } from 'tsyringe';
import * as yup from 'yup';
import AppError from '@shared/errors/AppError';
import IShopsRepository from '@modules/establishment/repositories/IShopsRepository';
import IProductsShopsRepository from '@modules/product/repositories/IProductsShopsRepository';
import { ISalesItemsRepository } from '../repositories/ISalesItemsRepository';
import { ISalesRepository } from '../repositories/ISalesRepository';
import { ICreatetSalesItemsDTO } from '../dtos/ICreateSalesItemDTO';

interface IRequestSaleItem {
  id_produto: number;
  quantidade: number;
}

interface IResponse {
  id_loja: number;
  id_usuario: number;
  items: IRequestSaleItem[];
}

interface IRequestSale {
  id_loja: number;
  id_usuario: number;
  items: IRequestSaleItem[];
}

@injectable()
export class CreateSaleService {
  constructor(
    @inject('SalesRepository')
    private salesRepository: ISalesRepository,

    @inject('SalesItemsRepository')
    private salesItemsRepository: ISalesItemsRepository,

    @inject('ShopsRepository')
    private shopsRepository: IShopsRepository,

    @inject('ProductsShopsRepository')
    private productsRepository: IProductsShopsRepository,
  ) {}

  public async execute(data: IRequestSale): Promise<IResponse> {
    const schema = yup.object().shape({
      id_loja: yup.number().required('Loja não informada'),
      items: yup
        .array()
        .of(
          yup.object().shape({
            quantidade: yup
              .number()
              .positive()
              .required('Quantidade do produto não informada'),
            id_produto: yup
              .number()
              .positive()
              .required('Nenhum produto informado'),
          }),
        )
        .required('Items não informado para a venda'),
    });

    // Caso houver algum erro retorna com status 422
    await schema.validate(data).catch(err => {
      throw new AppError(err.message, 422);
    });

    // Se existe loja
    const shop = await this.shopsRepository.findById(data.id_loja);
    if (!shop) {
      throw new AppError('Loja não encontrada', 400);
    }

    const products: ICreatetSalesItemsDTO[] = [];
    let valor_total = 0;

    // Busca todas as informações do item na loja
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < data.items.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      const product = await this.productsRepository.findProductShopById(
        data.items[i].id_produto,
        data.id_loja,
      );

      if (!product) {
        throw new AppError('Um ou mais produto não encontrado', 400);
      }

      valor_total += data.items[i].quantidade * product.valor;

      products.push({
        id_loja: data.id_loja,
        id_produto: product.id_produto,
        quantidade: data.items[i].quantidade,
        valor_total: data.items[i].quantidade * product.valor,
        valor_unitario: product.valor,
      });
    }

    const sale = await this.salesRepository.create({
      id_loja: data.id_loja,
      id_usuario: data.id_usuario,
      valor_total,
    });

    const productsCreate = products.map(item => {
      return {
        ...item,
        id_venda: sale.id,
      };
    });

    const salesItems = await this.salesItemsRepository.create(productsCreate);

    return {
      id_loja: sale.id_loja,
      id_usuario: sale.id_usuario,
      items: salesItems,
    };
  }
}
