import { Request, Response } from 'express';
import ListProductsService from '@modules/product/services/ListProductsService';
import { container } from 'tsyringe';

export default class ProductsEstablishmentsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listProductsService = container.resolve(ListProductsService);

    const products = await listProductsService.execute(Number(id));

    return response.json(products);
  }
}
