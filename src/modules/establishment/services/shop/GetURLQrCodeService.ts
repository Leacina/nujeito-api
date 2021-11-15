import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IShopsRepository from '../../repositories/IShopsRepository';

@injectable()
export default class ListShopsService {
  constructor(
    @inject('ShopsRepository')
    private shopsRepository: IShopsRepository,
  ) {}

  public async execute(id_loja: number): Promise<number> {
    const shop = await this.shopsRepository.findById(id_loja);

    if (!shop) {
      throw new AppError('Loja não encontrada', 400);
    }

    return shop.id;
  }
}
