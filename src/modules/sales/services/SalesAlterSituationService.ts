import { inject, injectable } from 'tsyringe';
import { Sale } from '../infra/typeorm/entities/Sale';
import { ISalesRepository } from '../repositories/ISalesRepository';

interface IRequest {
  mensagem_pagamento: string;
  situacao: string;
}

@injectable()
export class SalesAlterSituationService {
  constructor(
    @inject('SalesRepository')
    private salesRepository: ISalesRepository,
  ) {}

  public async execute(id: number, data: IRequest): Promise<Sale> {
    const sale = await this.salesRepository.findById(id);

    sale.situacao = data.situacao;
    sale.mensagem_pagamento = data.mensagem_pagamento;

    await this.salesRepository.save(sale);

    return sale;
  }
}
