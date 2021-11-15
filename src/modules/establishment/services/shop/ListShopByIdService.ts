import { injectable, inject } from 'tsyringe';
import IShopsRepository from '../../repositories/IShopsRepository';

interface IResponse {
  id: number;
  nome: string;
  id_estabelecimento: number;
  nome_estabelecimento: string;
  cnpj: string;
  uf: string;
  cidade: string;
  bairro: string;
  logradouro: string;
}

@injectable()
export default class ListShopByIdService {
  constructor(
    @inject('ShopsRepository')
    private shopsRepository: IShopsRepository,
  ) {}

  public async execute(id: number): Promise<IResponse> {
    const shop = await this.shopsRepository.findById(id);

    return {
      id: shop.id,
      nome: shop.nome,
      bairro: shop.estabelecimento.bairro,
      cidade: shop.estabelecimento.cidade,
      cnpj: shop.estabelecimento.cnpj,
      nome_estabelecimento: shop.estabelecimento.nome,
      id_estabelecimento: shop.id_estabelecimento,
      logradouro: shop.estabelecimento.logradouro,
      uf: shop.estabelecimento.uf,
    };
  }
}
