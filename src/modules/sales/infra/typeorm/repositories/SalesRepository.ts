import { ICreatetSalesDTO } from '@modules/sales/dtos/ICreateSalesDTO';
import { addYears, subYears } from 'date-fns';
import { getRepository, Repository, Between } from 'typeorm';
import { ISalesRepository } from '../../../repositories/ISalesRepository';
import { Sale } from '../entities/Sale';

// TypeORM Query Operators
export const AfterDate = (date: Date) => Between(date, addYears(date, 100));
export const BeforeDate = (date: Date) => Between(subYears(date, 100), date);

export class SalesRepository implements ISalesRepository {
  private ormRepository: Repository<Sale>;

  constructor() {
    this.ormRepository = getRepository(Sale);
  }

  async create(data: ICreatetSalesDTO): Promise<Sale> {
    const sale = this.ormRepository.create(data);

    await this.ormRepository.save(sale);

    return sale;
  }

  async save(sale: Sale): Promise<Sale> {
    await this.ormRepository.save(sale);

    return sale;
  }

  async findById(id: number): Promise<Sale> {
    const sale = await this.ormRepository.findOne(id);

    return sale;
  }

  async findByDate(
    id_usuario: number,
    dataInicial: Date,
    dataFinal: Date,
    id_estabelecimento: number,
  ): Promise<Sale[]> {
    const whereEstablishment = id_estabelecimento
      ? ` and loja.id_estabelecimento = ${id_estabelecimento}`
      : '';

    const whereUsuario =
      Number(id_usuario) > 0 ? ` and sales.id_usuario = ${id_usuario}` : '';

    const sales = await this.ormRepository.find({
      join: {
        alias: 'sales',
        leftJoin: {
          loja: 'sales.loja',
        },
      },
      where: qb => {
        qb.where(
          //
          ` true ${whereUsuario} and sales.situacao = 'C' and sales.created_at between '${dataInicial.toISOString()}' and '${dataFinal.toISOString()}' ${whereEstablishment}`,
        );
      },
      relations: [
        'loja',
        'loja.estabelecimento',
        'usuario',
        'items',
        'items.produto',
      ],
    });

    return sales;
  }
}
