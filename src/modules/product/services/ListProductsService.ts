import { injectable, inject } from 'tsyringe';
import IResponseList from '@shared/utils/dtos/IResponseList';
import IFilterRequestList from '@shared/utils/dtos/IFilterRequestList';
import ListResponse from '@shared/utils/implementations/AppListResponse';
import IProductsRepository from '../repositories/IProductsRepository';

@injectable()
export default class ListProductervice {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(
    filterPage?: IFilterRequestList,
  ): Promise<IResponseList | undefined> {
    const products = await this.productsRepository.find(filterPage);

    return new ListResponse(
      products,
      filterPage.page,
      filterPage.pageSize,
      filterPage.ignorePage,
    );
  }
}
