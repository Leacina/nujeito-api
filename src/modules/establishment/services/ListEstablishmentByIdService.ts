import { injectable, inject } from 'tsyringe';
import Establishment from '../infra/typeorm/entities/Establishment';
import IEstablishmentsRepository from '../repositories/IEstablishmentsRepository';

@injectable()
export default class ListEstablishmentByIdService {
  constructor(
    @inject('EstablishmentsRepository')
    private establishmentsRepository: IEstablishmentsRepository,
  ) {}

  public async execute(id: number): Promise<Establishment> {
    const establishment = await this.establishmentsRepository.findById(id);

    return establishment;
  }
}
