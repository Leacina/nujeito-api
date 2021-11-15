import { injectable, inject } from 'tsyringe';
import IResponseList from '@shared/utils/dtos/IResponseList';
import IEstablishmentsRepository from '@modules/establishment/repositories/IEstablishmentsRepository';
import Shop from '@modules/establishment/infra/typeorm/entities/Shop';
import AppError from '@shared/errors/AppError';
import IProductsShopsRepository from '../repositories/IProductsShopsRepository';

@injectable()
export default class ListProductervice {
  constructor(
    @inject('ProductsShopsRepository')
    private productsRepository: IProductsShopsRepository,

    @inject('EstablishmentsRepository')
    private establishmentsRepository: IEstablishmentsRepository,
  ) {}

  public async execute(
    id_establishment: number,
  ): Promise<IResponseList | undefined> {
    // Busca todas as lojas/frezeer do condominio
    const establishment = await this.establishmentsRepository.findById(
      id_establishment,
    );

    // eslint-disable-next-line prefer-const
    let products = [];

    if (!establishment) {
      throw new AppError('Estabelecimento não encontrado', 400);
    }

    const shops = establishment.lojas;

    if (shops) {
      // eslint-disable-next-line no-unused-expressions
      shops as Shop[];

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < shops.length; i++) {
        // eslint-disable-next-line no-await-in-loop
        const productsShop = await this.productsRepository.findProductsByShop(
          shops[i].id,
        );

        products.push(...productsShop);
      }
    }
    console.log(products);
    // TODO: REVER ISSO
    const productReturn = products
      ? products.map(item => {
          return {
            ...item.produto,
            valor: item.valor,
            qt_estoque: item.qt_estoque,
          };
        })
      : [];

    return { hasNext: false, items: productReturn };
  }
}
