import IShopsRepository from '@modules/establishment/repositories/IShopsRepository';
import ICreateShopDTO from '@modules/establishment/dtos/ICreateShopDTO';
import { Repository, getRepository } from 'typeorm';
import Shop from '../entities/Shop';

export default class ShopsRepository implements IShopsRepository {
  private ormRepository: Repository<Shop>;

  constructor() {
    this.ormRepository = getRepository(Shop);
  }

  async find(): Promise<Shop[]> {
    const shops = await this.ormRepository.find();

    return shops;
  }

  async findById(id: number): Promise<Shop> {
    const shop = await this.ormRepository.findOne({ where: { id } });

    return shop;
  }

  async save(shop: Shop): Promise<Shop> {
    const savedShop = await this.ormRepository.save(shop);

    return savedShop;
  }

  async create(data: ICreateShopDTO): Promise<Shop> {
    const shop = this.ormRepository.create(data);

    await this.ormRepository.save(shop);

    return shop;
  }
}
