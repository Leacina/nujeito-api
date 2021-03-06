import { Request, Response } from 'express';
import CreateEstablishmentService from '@modules/establishment/services/CreateEstablishmentService';
import UpdateEstablishmentService from '@modules/establishment/services/UpdateEstablishmentService';
import ListEstablishmentsService from '@modules/establishment/services/ListEstablishmentsService';
import ListEstablishmentByIdService from '@modules/establishment/services/ListEstablishmentByIdService';
import { container } from 'tsyringe';

export default class EstablishmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      cnpj,
      uf,
      cidade,
      bairro,
      logradouro,
      chave_mercado_pago,
      token_mercado_pago,
      taxa,
      lojas,
    } = request.body;

    const createEstablishmentService = container.resolve(
      CreateEstablishmentService,
    );

    const establishment = await createEstablishmentService.execute({
      nome,
      cnpj,
      uf,
      cidade,
      bairro,
      logradouro,
      token_mercado_pago,
      taxa,
      chave_mercado_pago,
      lojas,
    });

    return response.json(establishment);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      cnpj,
      uf,
      cidade,
      bairro,
      logradouro,
      chave_mercado_pago,
      token_mercado_pago,
      taxa,
      lojas,
    } = request.body;
    const { id } = request.params;
    const createEstablishmentService = container.resolve(
      UpdateEstablishmentService,
    );

    const establishment = await createEstablishmentService.execute(Number(id), {
      nome,
      cnpj,
      uf,
      cidade,
      bairro,
      token_mercado_pago,
      taxa,
      logradouro,
      chave_mercado_pago,
      lojas,
    });

    return response.json(establishment);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const listEstablishmentsService = container.resolve(
      ListEstablishmentsService,
    );

    const establishments = await listEstablishmentsService.execute();

    return response.json(establishments);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listEstablishmentByIdService = container.resolve(
      ListEstablishmentByIdService,
    );

    const establishment = await listEstablishmentByIdService.execute(
      Number(id),
    );

    return response.json(establishment);
  }
}
