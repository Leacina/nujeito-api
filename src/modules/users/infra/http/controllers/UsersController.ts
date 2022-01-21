import { Request, Response } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';
import { container } from 'tsyringe';
import UserLoggedService from '@modules/users/services/UserLoggedService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      email,
      senha,
      cpf,
      telefone,
      is_logista_nujeito,
      id_estabelecimento,
      uf,
      cidade,
      bairro,
      rg,
      cep,
      logradouro,
    } = request.body;

    const createUserService = container.resolve(CreateUserService);
    const user = await createUserService.execute({
      nome,
      email,
      senha,
      telefone,
      cpf,
      is_logista_nujeito,
      id_estabelecimento: id_estabelecimento || 0,
      uf,
      cidade,
      rg,
      cep,
      bairro,
      logradouro,
    });

    return response.json(user);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const userLogged = container.resolve(UserLoggedService);

    const user = await userLogged.execute(Number(request.user.id));

    return response.json(user);
  }
}
