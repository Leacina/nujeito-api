import IProductsShopsRepository from '@modules/product/repositories/IProductsShopsRepository';
import { Repository, getRepository } from 'typeorm';
import ProductShop from '../entities/ProductShop';
import ICreateProductShop from '../../../dtos/ICreateProductShopDTO';

export default class ProductsShopsRepository
  implements IProductsShopsRepository {
  private ormRepository: Repository<ProductShop>;

  constructor() {
    this.ormRepository = getRepository(ProductShop);
  }

  async create(data: ICreateProductShop): Promise<ProductShop> {
    const productShop = this.ormRepository.create(data);
    await this.ormRepository.save(productShop);

    return productShop;
  }

  async findByLoja(id_loja: number): Promise<ProductShop[]> {
    const productsShop = await this.ormRepository.find({
      where: {
        id_loja,
      },
    });

    return productsShop;
  }

  async findById(id_produto: number): Promise<ProductShop[]> {
    const productsShop = await this.ormRepository.find({
      where: {
        id_produto,
      },
    });

    return productsShop;
  }

  async find(): Promise<ProductShop[]> {
    const productsShop = await this.ormRepository.find();

    return productsShop;
  }

  async save(product: ProductShop): Promise<ProductShop> {
    const savedProduct = await this.ormRepository.save(product);

    return savedProduct;
  }
}