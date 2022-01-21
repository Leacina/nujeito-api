import { Request, Response } from 'express';
import { CreateProductService } from '@modules/product/services/CreateProductService';
import { UpdateProductService } from '@modules/product/services/UpdateProductService';
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

  public async store(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      qt_fracionado,
      codigo_barras,
      tp_embalagem,
      infoLojas,
    } = request.body;

    const { id } = request.params;

    const createProductService = container.resolve(UpdateProductService);

    const product = await createProductService.execute(
      Number(id),
      Number(request.user.id),
      {
        nome,
        qt_fracionado: qt_fracionado || 1,
        codigo_barras,
        tp_embalagem,
        infoLojas,
      },
    );

    return response.json(product);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listProductByIdService = container.resolve(ListProductByIdService);

    const product = await listProductByIdService.execute(Number(id));

    return response.json(product);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { page, limit, search } = request.query;

    const listProductsService = container.resolve(ListProductsService);

    const products = await listProductsService.execute({
      page: Number(page),
      pageSize: Number(limit) || 25,
      search: String(search),
    });

    return response.json(products);
  }
}
