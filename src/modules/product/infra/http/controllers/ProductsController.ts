import { Request, Response } from 'express';
import CreateProductService from '@modules/product/services/CreateProductService';
import ListProductByIdService from '@modules/product/services/ListProductByIdService';
import { container } from 'tsyringe';

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      id_estabelecimento,
      nome,
      valor,
      qt_estoque,
      qt_fracionado,
      codigo_barras,
      tp_embalagem,
    } = request.body;

    const createProductService = container.resolve(CreateProductService);

    const product = await createProductService.execute({
      id_estabelecimento,
      nome,
      valor,
      qt_estoque,
      qt_fracionado,
      codigo_barras,
      tp_embalagem,
    });

    return response.json(product);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listProductByIdService = container.resolve(ListProductByIdService);

    const product = await listProductByIdService.execute(Number(id));

    return response.json(product);
  }
}
