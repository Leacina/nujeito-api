import { Request, Response } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';
import { container } from 'tsyringe';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { nome, email, senha, cpf, telefone } = request.body;

    const createUserService = container.resolve(CreateUserService);
    const user = await createUserService.execute({
      nome,
      email,
      senha,
      telefone,
      cpf,
    });

    delete user.senha;

    return response.json(user);
  }
}
