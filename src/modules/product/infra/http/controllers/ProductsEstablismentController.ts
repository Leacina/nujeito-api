import { Request, Response } from 'express';
import ListProductsEstablishmentService from '@modules/product/services/ListProductsEstablishmentService';
import { container } from 'tsyringe';

export default class ProductsEstablishmentsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listProductsEstablishmentService = container.resolve(
      ListProductsEstablishmentService,
    );

    const products = await listProductsEstablishmentService.execute(Number(id));

    return response.json(products);
  }
}
