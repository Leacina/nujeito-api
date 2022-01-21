import { inject, injectable } from 'tsyringe';
import { Sale } from '../infra/typeorm/entities/Sale';
import { ISalesRepository } from '../repositories/ISalesRepository';

@injectable()
export class SaleDoneService {
  constructor(
    @inject('SalesRepository')
    private salesRepository: ISalesRepository,
  ) {}

  public async execute(id: number): Promise<Sale> {
    const sale = await this.salesRepository.findById(id);

    sale.situacao = 'C';

    await this.salesRepository.save(sale);

    return sale;
  }
}
