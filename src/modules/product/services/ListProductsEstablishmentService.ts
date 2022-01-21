import { injectable, inject } from 'tsyringe';
import IEstablishmentsRepository from '@modules/establishment/repositories/IEstablishmentsRepository';
import Shop from '@modules/establishment/infra/typeorm/entities/Shop';
import AppError from '@shared/errors/AppError';
import IProductsShopsRepository from '../repositories/IProductsShopsRepository';

@injectable()
export default class ListProductervice {
  constructor(
    @inject('ProductsShopsRepository')
    private productsRepository: IProductsShopsRepository,

    @inject('EstablishmentsRepository')
    private establishmentsRepository: IEstablishmentsRepository,
  ) {}

  public async execute(id_establishment: number): Promise<any | undefined> {
    // Busca todas as lojas/frezeer do condominio
    const establishment = await this.establishmentsRepository.findById(
      id_establishment,
    );

    // eslint-disable-next-line prefer-const
    let products = [];

    if (!establishment) {
      throw new AppError('Estabelecimento não encontrado', 400);
    }

    const shops = establishment.lojas;

    if (shops) {
      // eslint-disable-next-line no-unused-expressions
      shops as Shop[];

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < shops.length; i++) {
        // eslint-disable-next-line no-await-in-loop
        const productsShop = await this.productsRepository.findProductsByShop(
          shops[i].id,
        );

        products.push(...productsShop);
      }
    }

    // TODO: REVER ISSO
    const productReturn = products
      ? products.map(item => {
          return {
            ...item.produto,
            id_loja: item.loja.id,
            loja: item.loja,
            ds_imagem: item.produto.ds_imagem
              ? `http://191.252.192.163:3333/api/produto/imagem/${item.produto.ds_imagem}`
              : '',
            valor: item.valor,
            qt_estoque: item.qt_estoque,
          };
        })
      : [];

    return {
      hasNext: false,
      id_estabelecimento: establishment.id,
      nome_estabelecimento: establishment.nome,
      cidade: establishment.cidade,
      bairro: establishment.bairro,
      estado: establishment.uf,
      id_loja: 0,
      nome_loja: '',
      items: productReturn,
    };
  }
}
