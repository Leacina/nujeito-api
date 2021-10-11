import { injectable, inject } from 'tsyringe';
import IResponseList from '@shared/utils/dtos/IResponseList';
// import ListResponse from '@shared/utils/implementations/AppListResponse';
// import Establishment from '../infra/typeorm/entities/Establishment';
import IShopsRepository from '../../repositories/IShopsRepository';

@injectable()
export default class ListShopsService {
  constructor(
    @inject('ShopsRepository')
    private shopsRepository: IShopsRepository,
  ) {}

  public async execute(): Promise<IResponseList | undefined> {
    const shops = await this.shopsRepository.find();

    return { hasNext: false, items: shops };
  }
}
