import Shop from '../infra/typeorm/entities/Shop';
import ICreateShopDTO from '../dtos/ICreateShopDTO';

export default interface IShopsRepository {
  create(data: ICreateShopDTO): Promise<Shop>;
  find(): Promise<Shop[]>;
  findById(id: number): Promise<Shop>;
  save(shop: Shop): Promise<Shop>;
}
