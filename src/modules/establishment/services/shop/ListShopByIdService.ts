import { injectable, inject } from 'tsyringe';
import Shop from '../../infra/typeorm/entities/Shop';
import IShopsRepository from '../../repositories/IShopsRepository';

@injectable()
export default class ListShopByIdService {
  constructor(
    @inject('ShopsRepository')
    private shopsRepository: IShopsRepository,
  ) {}

  public async execute(id: number): Promise<Shop> {
    const shop = await this.shopsRepository.findById(id);

    return shop;
  }
}
