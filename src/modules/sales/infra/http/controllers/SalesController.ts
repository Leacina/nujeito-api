import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateSaleService } from '../../../services/CreateSaleService';
import { ListSaleService } from '../../../services/ListSalesService';

export default class SalesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id_loja, items } = request.body;

    const createSaleService = container.resolve(CreateSaleService);

    await createSaleService.execute({
      items,
      id_loja,
      id_usuario: request.user.id,
    });

    return response.json({ id_usuario: request.user.id, id_loja, items });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { dataFinal, dataInicial } = request.body;

    const listSalesService = container.resolve(ListSaleService);

    const sales = await listSalesService.execute({
      // Pega a data de um mês atrás por default
      dataInicial: dataInicial
        ? new Date(dataInicial)
        : new Date(new Date().setMonth(new Date().getMonth() - 1)),
      dataFinal: dataFinal ? new Date(dataFinal) : new Date(),
      id_usuario: request.user.id,
    });

    return response.json(sales);
  }
}
