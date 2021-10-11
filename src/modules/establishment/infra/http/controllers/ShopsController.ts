import { Request, Response } from 'express';
import CreateShopService from '@modules/establishment/services/shop/CreateShopService';
import ListShopsService from '@modules/establishment/services/shop/ListShopsService';
import ListShopByIdService from '@modules/establishment/services/shop/ListShopByIdService';
import { container } from 'tsyringe';

export default class ShopsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { nome, id_estabelecimento } = request.body;

    const createShopService = container.resolve(CreateShopService);

    const shop = await createShopService.execute({
      nome,
      id_estabelecimento,
    });

    return response.json(shop);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const listShopsService = container.resolve(ListShopsService);

    const shops = await listShopsService.execute();

    return response.json(shops);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listShopByIdService = container.resolve(ListShopByIdService);

    const shop = await listShopByIdService.execute(Number(id));

    return response.json(shop);
  }
}
