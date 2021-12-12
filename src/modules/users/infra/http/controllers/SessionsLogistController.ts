import { Request, Response } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { container } from 'tsyringe';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, senha } = request.body;

    const autheticateUser = container.resolve(AuthenticateUserService);

    const { usuario, token } = await autheticateUser.execute({
      email,
      senha,
      loginLogist: true,
    });

    return response.json({ usuario, token });
  }
}
