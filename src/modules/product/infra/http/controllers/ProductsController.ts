import { Request, Response } from 'express';
import { CreateProductService } from '@modules/product/services/CreateProductService';
import ListProductByIdService from '@modules/product/services/ListProductByIdService';
import ListProductsService from '@modules/product/services/ListProductsService';
import { container } from 'tsyringe';

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      qt_fracionado,
      codigo_barras,
      tp_embalagem,
      infoLojas,
    } = request.body;

    const createProductService = container.resolve(CreateProductService);

    const product = await createProductService.execute({
      nome,
      qt_fracionado: qt_fracionado || 1,
      codigo_barras,
      tp_embalagem,
      infoLojas,
    });

    return response.json(product);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listProductByIdService = container.resolve(ListProductByIdService);

    const product = await listProductByIdService.execute(Number(id));

    return response.json(product);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { page, limit } = request.query;

    const listProductsService = container.resolve(ListProductsService);

    const products = await listProductsService.execute({
      page: Number(page),
      pageSize: Number(limit) || 25,
    });

    return response.json(products);
  }
}
