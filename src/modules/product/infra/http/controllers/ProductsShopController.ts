import { Request, Response } from 'express';
import ListProductsShopService from '@modules/product/services/ListProductsShopService';
import { container } from 'tsyringe';

export default class ProductsEstablishmentsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listProductsService = container.resolve(ListProductsShopService);

    const products = await listProductsService.execute(Number(id));

    return response.json(products);
  }
}
