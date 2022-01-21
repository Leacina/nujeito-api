import { injectable, inject } from 'tsyringe';
import IResponseList from '@shared/utils/dtos/IResponseList';
import IFilterRequestList from '@shared/utils/dtos/IFilterRequestList';
import ListResponse from '@shared/utils/implementations/AppListResponse';
import IProductsShopsRepository from '../repositories/IProductsShopsRepository';

@injectable()
export default class ListProductsClosedValidateService {
  constructor(
    @inject('ProductsShopsRepository')
    private productsRepository: IProductsShopsRepository,
  ) {}

  public async execute(
    filterPage?: IFilterRequestList,
  ): Promise<IResponseList | undefined> {
    const products = await this.productsRepository.findCloseValidate(
      filterPage,
    );

    return new ListResponse(
      products,
      filterPage.page,
      filterPage.pageSize,
      filterPage.ignorePage,
    );
  }
}
