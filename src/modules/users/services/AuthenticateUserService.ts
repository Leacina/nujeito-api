import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  email: string;
  senha: string;
  loginLogist?: boolean;
}

interface IResponse {
  usuario: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('BCryptHashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    senha,
    loginLogist,
  }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('E-mail ou senha inválido!', 401);
    }

    const isPasswordMatch = await this.hashProvider.compareHash(
      senha,
      user.senha,
    );

    if (!isPasswordMatch) {
      throw new AppError('E-mail ou senha inválido!', 401);
    }

    if (loginLogist && !user.is_logista_nujeito) {
      throw new AppError(
        'Você não tem permissão para acessar esse painel! Entre em contato com o administrador',
        401,
      );
    }

    const { expiresIn, secret } = authConfig.jwt;

    const token = sign(
      {
        id: user.id,
        name: user.nome,
        email: user.email,
        cellphone: user.telefone,
        establishment_id: user.id_estabelecimento || '0',
      },
      secret,
      {
        expiresIn,
        subject: String(user.id),
      },
    );

    delete user.senha;

    return {
      usuario: user,
      token,
    };
  }
}

export default AuthenticateUserService;
