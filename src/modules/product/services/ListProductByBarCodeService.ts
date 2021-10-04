import { injectable, inject } from 'tsyringe';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

@injectable()
export default class ListProductByBarCodeService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(codigo_barras: number): Promise<Product> {
    const product = await this.productsRepository.findByBarCode(codigo_barras);

    return product;
  }
}
