import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import * as yup from 'yup';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  id_estabelecimento: number;
  nome: string;
  valor: number;
  qt_estoque: number;
  qt_fracionado: number;
  codigo_barras: number;
  tp_embalagem: string;
}

@injectable()
export default class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(data: IRequest): Promise<Product> {
    const schema = yup.object().shape({
      nome: yup.string().required('Nome do produto não informado'),
      valor: yup.number().required('Valor do produto não informado'),
      qt_estoque: yup.number().required('Quantidade em estoque não informado'),
      qt_fracionado: yup
        .number()
        .required('Quantidade fracionada não informada'),
      codigo_barras: yup.number().required('Código de barras não informada'),
      tp_embalagem: yup.number().required('Tipo de embalagem não informada'),
      id_estabelecimento: yup
        .number()
        .required('Estabelecimento não informado'),
    });

    // Caso houver algum erro retorna com status 422
    await schema.validate(data).catch(err => {
      throw new AppError(err.message, 422);
    });

    const product = await this.productsRepository.create(data);

    return product;
  }
}
