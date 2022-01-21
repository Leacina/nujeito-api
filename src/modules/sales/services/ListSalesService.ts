import { inject, injectable } from 'tsyringe';
import { Sale } from '../infra/typeorm/entities/Sale';
import { ISalesRepository } from '../repositories/ISalesRepository';

interface IRequest {
  id_usuario: number;
  dataInicial?: Date;
  dataFinal?: Date;
  id_estabelecimento?: number;
}

@injectable()
export class ListSaleService {
  constructor(
    @inject('SalesRepository')
    private salesRepository: ISalesRepository,
  ) {}

  public async execute(data: IRequest): Promise<Sale[]> {
    console.log(data.id_usuario);
    const sales = await this.salesRepository.findByDate(
      data.id_usuario,
      data.dataInicial,
      data.dataFinal,
      data.id_estabelecimento,
    );

    return sales;
  }
}
