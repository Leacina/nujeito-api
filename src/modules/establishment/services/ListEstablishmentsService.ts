import { injectable, inject } from 'tsyringe';
import IResponseList from '@shared/utils/dtos/IResponseList';
// import ListResponse from '@shared/utils/implementations/AppListResponse';
// import Establishment from '../infra/typeorm/entities/Establishment';
import IEstablishmentsRepository from '../repositories/IEstablishmentsRepository';

@injectable()
export default class ListEstablishmentsService {
  constructor(
    @inject('EstablishmentsRepository')
    private establishmentsRepository: IEstablishmentsRepository,
  ) {}

  public async execute(): Promise<IResponseList | undefined> {
    const establishments = await this.establishmentsRepository.find();

    return { hasNext: false, items: establishments };
  }
}
