import IProductsShopsRepository from '@modules/product/repositories/IProductsShopsRepository';
import { Repository, getRepository } from 'typeorm';
import IFilterRequestList from '@shared/utils/dtos/IFilterRequestList';
import ProductShop from '../entities/ProductShop';
import ICreateProductShop from '../../../dtos/ICreateProductShopDTO';

export default class ProductsShopsRepository
  implements IProductsShopsRepository {
  private ormRepository: Repository<ProductShop>;

  constructor() {
    this.ormRepository = getRepository(ProductShop);
  }

  async create(data: ICreateProductShop[]): Promise<ProductShop[]> {
    const productShop = this.ormRepository.create(data);
    await this.ormRepository.save(productShop);

    return productShop;
  }

  async findProductShopById(
    id_produto: number,
    id_loja: number,
  ): Promise<ProductShop> {
    const productShop = await this.ormRepository.findOne({
      where: { id_produto, id_loja },
      relations: ['produto', 'loja'],
    });

    return productShop;
  }

  async findProductsByShop(id_loja: number): Promise<ProductShop[]> {
    const productsShop = await this.ormRepository.find({
      where: { id_loja },
      relations: ['produto', 'loja'],
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

  async deleteById(id_produto: number): Promise<void> {
    await this.ormRepository.delete({ id_produto });
  }

  async deleteByIdAndShop(id_produto: number, id_loja: number): Promise<void> {
    await this.ormRepository.delete({
      id_produto,
      id_loja,
    });
  }

  async find(): Promise<ProductShop[]> {
    const productsShop = await this.ormRepository.find();

    return productsShop;
  }

  async findCloseValidate(
    { page, pageSize }: IFilterRequestList,
    id_loja?: number,
  ): Promise<ProductShop[]> {
    const productsShop = await this.ormRepository.find({
      join: {
        alias: 'product',
      },
      where: qb => {
        qb.where(
          `str_to_date(product.validade, '%d/%m/%Y') < (CURRENT_DATE + INTERVAL 45 DAY) and product.validade <> '' and product.validade is not null ${
            Number(id_loja) > 0 ? '' : ''
          }`,
        );
      },
      relations: ['produto', 'loja'],
      skip: page ? page - 1 : 0,
      take: pageSize + 1 || 25,
      order: {
        validade: 'DESC',
        id: 'DESC',
      },
    });

    return productsShop;
  }

  async save(product: ProductShop[]): Promise<ProductShop[]> {
    const savedProduct = await this.ormRepository.save(product);

    return savedProduct;
  }
}
