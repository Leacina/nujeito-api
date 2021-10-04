import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import * as yup from 'yup';
import Establishment from '../infra/typeorm/entities/Establishment';
import IEstablishmentsRepository from '../repositories/IEstablishmentsRepository';

interface IRequest {
  nome: string;
  cnpj: string;
  uf: string;
  cidade: string;
  bairro: string;
  logradouro: string;
}

@injectable()
export default class CreateEstablishmentService {
  constructor(
    @inject('EstablishmentsRepository')
    private establishmentsRepository: IEstablishmentsRepository,
  ) {}

  public async execute(data: IRequest): Promise<Establishment> {
    const schema = yup.object().shape({
      nome: yup.string().required('Nome do usuário não informado'),
      uf: yup.string().required('UF do estabelecimento não informada'),
      cidade: yup.string().required('Cidade não informada'),
      bairro: yup.string().required('Bairro não informado'),
      logradouro: yup.string().required('Logradouro não informado'),
      cnpj: yup.string().required('CNPJ do estabelecimento não informado'),
    });

    // Caso houver algum erro retorna com status 422
    await schema.validate(data).catch(err => {
      throw new AppError(err.message, 422);
    });

    const establishment = await this.establishmentsRepository.create(data);

    return establishment;
  }
}
