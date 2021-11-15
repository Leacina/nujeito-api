import IFilterRequestList from '@shared/utils/dtos/IFilterRequestList';
import Product from '../infra/typeorm/entities/Product';
import ICreateProductDTO from '../dtos/ICreateProductDTO';

export default interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  findByEstablishment(id_estabelecimento: number): Promise<Product[]>;
  find(data: IFilterRequestList): Promise<Product[]>;
  findById(id: number): Promise<Product>;
  findByBarCode(barCode: number): Promise<Product>;
  save(product: Product): Promise<Product>;
}
