import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import * as yup from 'yup';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  cpf: string;
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(data: IRequest): Promise<User> {
    const schema = yup.object().shape({
      nome: yup.string().required('Nome do usuário não informado'),
      senha: yup.string().required('Senha do usuário não informada'),
      email: yup.string().required('E-mail do usuário não informado'),
      telefone: yup.string().required('Telefone do usuário não informado'),
      cpf: yup.string().required('CPF do usuário não informado'),
    });

    // Caso houver algum erro retorna com status 422
    await schema.validate(data).catch(err => {
      throw new AppError(err.message, 422);
    });

    // Busca se tem algum usuário com o mesmo e-mail
    const checkUniqueEmail = await this.usersRepository.findByEmail(data.email);

    // Se tiver usuário com o e-mail
    if (checkUniqueEmail) {
      throw new AppError('Já possui um usuário com o e-mail informado!', 400);
    }

    const user = await this.usersRepository.create(data);

    return user;
  }
}
