import { ICreatetSalesItemsDTO } from '../dtos/ICreateSalesItemDTO';
import { SaleItem } from '../infra/typeorm/entities/SaleItem';

export interface ISalesItemsRepository {
  create(data: ICreatetSalesItemsDTO[]): Promise<SaleItem[]>;
}
