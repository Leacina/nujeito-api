import { injectable, inject } from 'tsyringe';
import IResponseList from '@shared/utils/dtos/IResponseList';
import IProductsShopsRepository from '../repositories/IProductsShopsRepository';

@injectable()
export default class ListProductervice {
  constructor(
    @inject('ProductsShopsRepository')
    private productsRepository: IProductsShopsRepository,
  ) {}

  public async execute(id_loja: number): Promise<IResponseList | undefined> {
    const products = await this.productsRepository.findProductsByShop(id_loja);

    // TODO: REVER ISSO
    const productReturn = products.map(item => {
      return {
        ...item.produto,
        valor: item.valor,
        qt_estoque: item.qt_estoque,
      };
    });

    return { hasNext: false, items: productReturn };
  }
}
