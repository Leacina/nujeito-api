import { injectable, inject } from 'tsyringe';
import IResponseList from '@shared/utils/dtos/IResponseList';
import IProductsRepository from '../repositories/IProductsRepository';

@injectable()
export default class ListProductervice {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(
    id_estabelecimento: number,
  ): Promise<IResponseList | undefined> {
    const products = await this.productsRepository.findByEstablishment(
      id_estabelecimento,
    );

    return { hasNext: true, items: products };
  }
}
