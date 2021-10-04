import { Request, Response } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';
import { container } from 'tsyringe';

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
    } = request.body;

    const createUserService = container.resolve(CreateUserService);
    const user = await createUserService.execute({
      nome,
      email,
      senha,
      telefone,
      cpf,
      is_logista_nujeito,
      id_estabelecimento,
    });

    return response.json(user);
  }
}
