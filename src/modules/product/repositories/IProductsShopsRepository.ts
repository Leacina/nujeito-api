import IFilterRequestList from '@shared/utils/dtos/IFilterRequestList';
import ProductShop from '../infra/typeorm/entities/ProductShop';
import ICreateProductShopDTO from '../dtos/ICreateProductShopDTO';

export default interface IProductsShopsRepository {
  create(data: ICreateProductShopDTO[]): Promise<ProductShop[]>;
  findProductShopById(
    id_produto: number,
    id_loja: number,
  ): Promise<ProductShop>;
  findProductsByShop(id_loja: number): Promise<ProductShop[]>;
  findById(id_produto: number): Promise<ProductShop[]>;
  findCloseValidate(
    data: IFilterRequestList,
    id_loja?: number,
  ): Promise<ProductShop[]>;
  deleteById(id_produto: number): Promise<void>;
  deleteByIdAndShop(id_produto: number, id_loja: number): Promise<void>;
  find(): Promise<ProductShop[]>;
  save(product: ProductShop[]): Promise<ProductShop[]>;
}
