import ProductShop from '../infra/typeorm/entities/ProductShop';
import ICreateProductShopDTO from '../dtos/ICreateProductShopDTO';

export default interface IProductsShopsRepository {
  create(data: ICreateProductShopDTO): Promise<ProductShop>;
  findByLoja(id_loja: number): Promise<ProductShop[]>;
  findById(id_produto: number): Promise<ProductShop[]>;
  find(): Promise<ProductShop[]>;
  save(product: ProductShop): Promise<ProductShop>;
}
