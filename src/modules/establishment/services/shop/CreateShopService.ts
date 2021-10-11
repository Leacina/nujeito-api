import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import * as yup from 'yup';
import Shop from '../../infra/typeorm/entities/Shop';
import IShopsRepository from '../../repositories/IShopsRepository';

interface IRequest {
  nome: string;
  id_estabelecimento: number;
}

@injectable()
export default class CreateShopService {
  constructor(
    @inject('ShopsRepository')
    private shopsRepository: IShopsRepository,
  ) {}

  public async execute(data: IRequest): Promise<Shop> {
    const schema = yup.object().shape({
      nome: yup.string().required('Nome do usuário não informado'),
      id_estabelecimento: yup
        .number()
        .required('Estabelecimento não informado'),
    });

    // Caso houver algum erro retorna com status 422
    await schema.validate(data).catch(err => {
      throw new AppError(err.message, 422);
    });

    const shop = await this.shopsRepository.create(data);

    return shop;
  }
}
