import { getRepository, Repository } from 'typeorm';

import IProductsRepository from '@modules/product/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/product/dtos/ICreateProductDTO';
import IFilterRequestList from '@shared/utils/dtos/IFilterRequestList';
import FindFilters from '@shared/utils/implementations/common';
import Product from '../entities/Product';

export default class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  async findByBarCode(codigo_barras: number): Promise<Product> {
    const product = await this.ormRepository.findOne({
      where: {
        codigo_barras,
      },
    });

    return product;
  }

  async findByEstablishment(id_estabelecimento: number): Promise<Product[]> {
    const products = await this.ormRepository.find({
      where: {
        id_estabelecimento,
      },
    });

    return products;
  }

  async find({
    page,
    pageSize,
    search,
  }: IFilterRequestList): Promise<Product[]> {
    const searchSplit = search ? search.split(';') : [];
    const findFilters = new FindFilters(searchSplit);

    let where = ' true ';

    if (searchSplit.length > 1) {
      where += `and peca.nome like '%${findFilters.findSearch('nome')}%'`;

      if (Number(findFilters.findSearch('loja')) > 0) {
        where += ` and loja.id_loja in (${findFilters.findSearch('loja')})`;
      }
    }

    const products = await this.ormRepository.find({
      join: {
        alias: 'peca',
        leftJoin: {
          loja: 'peca.lojas',
        },
      },
      where: qb => {
        qb.where(where);
      },
      relations: ['lojas', 'lojas.loja', 'lojas.loja.estabelecimento'],
      skip: page ? page - 1 : 0,
      take: pageSize + 1 || 25,
      order: {
        id: 'DESC',
      },
    });

    return products;
  }

  async findById(id: number): Promise<Product> {
    const product = await this.ormRepository.findOne({
      where: {
        id,
      },
      relations: ['lojas', 'lojas.loja', 'lojas.loja.estabelecimento'],
    });

    return product;
  }

  async create(data: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create(data);

    await this.ormRepository.save(product);

    return product;
  }

  async save(product: Product): Promise<Product> {
    const updatedProduct = await this.ormRepository.save(product);
    return updatedProduct;
  }
}
