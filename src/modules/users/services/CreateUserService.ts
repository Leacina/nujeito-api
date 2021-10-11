import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import * as yup from 'yup';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  cpf: string;
  is_logista_nujeito: boolean;
  id_estabelecimento?: number;
  uf: string;
  cidade: string;
  bairro: string;
  logradouro: string;
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('BCryptHashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute(data: IRequest): Promise<User> {
    const schema = yup.object().shape({
      nome: yup.string().required('Nome do usuário não informado'),
      senha: yup.string().required('Senha do usuário não informada'),
      email: yup.string().required('E-mail do usuário não informado'),
      telefone: yup.string().required('Telefone do usuário não informado'),
      cpf: yup.string().required('CPF do usuário não informado'),
      uf: yup.string().required('UF não informada'),
      cidade: yup.string().required('Cidade não informada'),
      bairro: yup.string().required('Bairro não informado'),
      logradouro: yup.string().required('Logradouro não informado'),
    });

    // Caso houver algum erro retorna com status 422
    await schema.validate(data).catch(err => {
      throw new AppError(err.message, 422);
    });

    // if (data.is_logista_nujeito && data.id_estabelecimento <= 0) {
    //   throw new AppError('Usuário logista sem uma loja informada', 422);
    // }

    // Busca se tem algum usuário com o mesmo e-mail
    const checkUniqueEmail = await this.usersRepository.findByEmail(data.email);

    // Se tiver usuário com o e-mail
    if (checkUniqueEmail) {
      throw new AppError('Já possui um usuário com o e-mail informado!', 400);
    }

    // eslint-disable-next-line no-param-reassign
    data.senha = await this.hashProvider.generateHash(data.senha);

    const user = await this.usersRepository.create(data);

    return user;
  }
}
