import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IShopsRepository from '@modules/establishment/repositories/IShopsRepository';
import IProductsRepository from '../repositories/IProductsRepository';
import IProductsShopsRepository from '../repositories/IProductsShopsRepository';

interface IResponse {
  id: number;
  nome: string;
  qt_fracionado: number;
  codigo_barras: number;
  ds_imagem: string;
  tp_embalagem: string;
  valor: number;
  qt_estoque: number;
}

@injectable()
export default class ListProductByBarCodeService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('ProductsShopsRepository')
    private productsShopsRepository: IProductsShopsRepository,

    @inject('ShopsRepository')
    private shopsRepository: IShopsRepository,
  ) {}

  public async execute(
    codigo_barras: number,
    loja: number,
  ): Promise<IResponse> {
    const product = await this.productsRepository.findByBarCode(codigo_barras);

    if (!product) {
      throw new AppError('Código de barras não encontrado!', 422);
    }

    const shop = await this.shopsRepository.findById(loja);

    if (!shop) {
      throw new AppError('Loja não encontrada', 422);
    }

    const productShop = await this.productsShopsRepository.findProductShopById(
      product.id,
      loja,
    );

    if (!productShop) {
      throw new AppError('Produto não encontrada na loja.', 422);
    }

    return {
      ...product,
      ds_imagem:
        'https://superprix.vteximg.com.br/arquivos/ids/175207-600-600/Maca-Argentina--1-unidade-aprox.-200g-.png?v=636294203590200000',
      valor: productShop.valor,
      qt_estoque: productShop.qt_estoque,
    };
  }
}
