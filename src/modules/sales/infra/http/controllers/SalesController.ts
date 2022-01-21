import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateSaleService } from '../../../services/CreateSaleService';
import { ListSaleService } from '../../../services/ListSalesService';
import { SalesAlterSituationService } from '../../../services/SalesAlterSituationService';

export default class SalesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id_loja, items } = request.body;

    const createSaleService = container.resolve(CreateSaleService);

    const sale = await createSaleService.execute({
      items,
      id_loja,
      id_usuario: request.user.id,
    });

    return response.json(sale);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { situacao, mensagem_pagamento } = request.body;
    const { id } = request.params;

    const saleService = container.resolve(SalesAlterSituationService);

    const sale = await saleService.execute(Number(id), {
      situacao,
      mensagem_pagamento,
    });

    return response.json(sale);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const {
      dataFinal,
      dataInicial,
      id_estabelecimento,
      id_usuario,
    } = request.body;

    const listSalesService = container.resolve(ListSaleService);

    const sales = await listSalesService.execute({
      // Pega a data de um mês atrás por default
      dataInicial: dataInicial
        ? new Date(dataInicial)
        : new Date(new Date().setMonth(new Date().getMonth() - 1)),
      dataFinal: dataFinal ? new Date(dataFinal) : new Date(),
      id_usuario: id_usuario === 0 ? id_usuario : request.user.id,
      id_estabelecimento,
    });

    return response.json(sales);
  }
}
