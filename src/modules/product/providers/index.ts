/**
 * Injeção de dependências
 */
import { container } from 'tsyringe';

import IProductsRepository from '../repositories/IProductsRepository';
import ProductsRepository from '../infra/typeorm/repositories/ProductsRepository';

import IProductsShopsRepository from '../repositories/IProductsShopsRepository';
import ProductsShopsRepository from '../infra/typeorm/repositories/ProductsShopsRepository';

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IProductsShopsRepository>(
  'ProductsShopsRepository',
  ProductsShopsRepository,
);
