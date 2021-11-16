import { ICreatetSalesItemsDTO } from '@modules/sales/dtos/ICreateSalesItemDTO';
import { ISalesItemsRepository } from '@modules/sales/repositories/ISalesItemsRepository';
import { getRepository, Repository } from 'typeorm';
import { SaleItem } from '../entities/SaleItem';

export class SalesItemsRepository implements ISalesItemsRepository {
  private ormRepository: Repository<SaleItem>;

  constructor() {
    this.ormRepository = getRepository(SaleItem);
  }

  async create(data: ICreatetSalesItemsDTO[]): Promise<SaleItem[]> {
    const saleItems = this.ormRepository.create(data);

    await this.ormRepository.save(saleItems);

    return saleItems;
  }
}
