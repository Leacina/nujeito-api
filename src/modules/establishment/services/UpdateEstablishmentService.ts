import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import * as yup from 'yup';
import Establishment from '../infra/typeorm/entities/Establishment';
import IEstablishmentsRepository from '../repositories/IEstablishmentsRepository';
import IShopsRepository from '../repositories/IShopsRepository';

interface IRequest {
  nome: string;
  cnpj: string;
  uf: string;
  cidade: string;
  bairro: string;
  logradouro: string;
  chave_mercado_pago: string;
  token_mercado_pago: string;
  taxa: number;
  lojas: string[];
}

@injectable()
export default class UpdateEstablishmentService {
  constructor(
    @inject('EstablishmentsRepository')
    private establishmentsRepository: IEstablishmentsRepository,

    @inject('ShopsRepository')
    private shopsRepository: IShopsRepository,
  ) {}

  public async execute(
    id_estabelecimento: number,
    data: IRequest,
  ): Promise<Establishment> {
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

    const establishment = await this.establishmentsRepository.findById(
      id_estabelecimento,
    );

    establishment.nome = data.nome;
    establishment.cnpj = data.cnpj;
    establishment.uf = data.uf;
    establishment.cidade = data.cidade;
    establishment.bairro = data.bairro;
    establishment.logradouro = data.logradouro;
    establishment.chave_mercado_pago = data.chave_mercado_pago;
    establishment.token_mercado_pago = data.token_mercado_pago;
    establishment.taxa = data.taxa;

    await this.establishmentsRepository.save(establishment);

    // await this.shopsRepository.deleteAllEstablishment(establishment.id);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < data.lojas.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      this.shopsRepository.create({
        nome: data.lojas[i],
        id_estabelecimento: establishment.id,
      });
    }

    return establishment;
  }
}
