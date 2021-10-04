import { getRepository, Repository } from 'typeorm';

import IEstablishmentRepository from '@modules/establishment/repositories/IEstablishmentsRepository';
import ICreateEstablishmentDTO from '@modules/establishment/dtos/ICreateEstablishmentDTO';
import Establishment from '../entities/Establishment';

export default class EstablishmentsRepository
  implements IEstablishmentRepository {
  private ormRepository: Repository<Establishment>;

  constructor() {
    this.ormRepository = getRepository(Establishment);
  }

  async findById(id: number): Promise<Establishment> {
    const establishment = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return establishment;
  }

  async find(): Promise<Establishment[]> {
    const establishments = await this.ormRepository.find();

    return establishments;
  }

  async create(data: ICreateEstablishmentDTO): Promise<Establishment> {
    const establishment = this.ormRepository.create(data);

    this.ormRepository.save(establishment);

    return establishment;
  }

  async save(establishment: Establishment): Promise<Establishment> {
    const updatedEstablishment = await this.ormRepository.save(establishment);
    return updatedEstablishment;
  }
}
