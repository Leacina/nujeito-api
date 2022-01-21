import { injectable, inject } from 'tsyringe';
import IShopsRepository from '@modules/establishment/repositories/IShopsRepository';
import IProductsShopsRepository from '../repositories/IProductsShopsRepository';

@injectable()
export default class ListProductervice {
  constructor(
    @inject('ProductsShopsRepository')
    private productsRepository: IProductsShopsRepository,

    @inject('ShopsRepository')
    private shopsRepository: IShopsRepository,
  ) {}

  public async execute(id_loja: number): Promise<any | undefined> {
    const products = await this.productsRepository.findProductsByShop(id_loja);

    const shop = await this.shopsRepository.findById(id_loja);

    // TODO: REVER ISSO
    const productReturn = products.map(item => {
      return {
        ...item.produto,
        valor: item.valor,
        ds_imagem: item.produto.ds_imagem
          ? `http://191.252.192.163:3333/api/produto/imagem/${item.produto.ds_imagem}`
          : '',
        qt_estoque: item.qt_estoque,
      };
    });

    return {
      hasNext: false,
      id_estabelecimento: shop.estabelecimento.id,
      cidade: shop.estabelecimento.cidade,
      bairro: shop.estabelecimento.bairro,
      estado: shop.estabelecimento.uf,
      nome_estabelecimento: shop.estabelecimento.nome,
      id_loja: shop.id,
      nome_loja: shop.nome,
      items: productReturn,
    };
  }
}
