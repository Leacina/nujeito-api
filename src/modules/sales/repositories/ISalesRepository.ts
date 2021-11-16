import { ICreatetSalesDTO } from '../dtos/ICreateSalesDTO';
import { Sale } from '../infra/typeorm/entities/Sale';

export interface ISalesRepository {
  create(data: ICreatetSalesDTO): Promise<Sale>;
  findByDate(
    id_usuario: number,
    dataInicial: Date,
    dataFinal: Date,
  ): Promise<Sale[]>;
  save(data: Sale): Promise<Sale>;
}
