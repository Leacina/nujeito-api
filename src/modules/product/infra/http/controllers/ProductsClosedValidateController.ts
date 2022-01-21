import { Request, Response } from 'express';
import listProductsClosedValidateService from '@modules/product/services/ListProductsClosedValidateService';
import { container } from 'tsyringe';

export default class ProductsClosedValidateController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { page, limit, search } = request.query;

    const listProductByBarCodeService = container.resolve(
      listProductsClosedValidateService,
    );

    const product = await listProductByBarCodeService.execute({
      page: Number(page),
      pageSize: Number(limit) || 25,
      search: String(search),
    });

    return response.json(product);
  }
}
