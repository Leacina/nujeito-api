import { Request, Response } from 'express';
import ListProductByBarCodeService from '@modules/product/services/ListProductByBarCodeService';
import { container } from 'tsyringe';

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { codigo } = request.params;

    const listProductByBarCodeService = container.resolve(
      ListProductByBarCodeService,
    );

    const product = await listProductByBarCodeService.execute(Number(codigo));

    return response.json(product);
  }
}
