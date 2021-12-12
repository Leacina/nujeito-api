import IShopsRepository from '@modules/establishment/repositories/IShopsRepository';
import ICreateShopDTO from '@modules/establishment/dtos/ICreateShopDTO';
import { Repository, getRepository } from 'typeorm';
import Shop from '../entities/Shop';

export default class ShopsRepository implements IShopsRepository {
  private ormRepository: Repository<Shop>;

  constructor() {
    this.ormRepository = getRepository(Shop);
  }

  async deleteAllEstablishment(id_estabelecimento: number): Promise<void> {
    await this.ormRepository.delete({ id_estabelecimento });
  }

  async find(): Promise<Shop[]> {
    const shops = await this.ormRepository.find({
      relations: ['estabelecimento'],
    });

    return shops;
  }

  async findAllEstablishment(id_estabelecimento: number): Promise<Shop[]> {
    const shops = await this.ormRepository.find({
      where: {
        id_estabelecimento,
      },
    });

    return shops;
  }

  async findById(id: number): Promise<Shop> {
    const shop = await this.ormRepository.findOne({
      where: { id },
      relations: ['estabelecimento'],
    });

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
