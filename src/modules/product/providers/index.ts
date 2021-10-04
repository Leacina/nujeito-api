/**
 * Injeção de dependências
 */
import { container } from 'tsyringe';

import IProductsRepository from '../repositories/IProductsRepository';
import ProductsRepository from '../infra/typeorm/repositories/ProductsRepository';

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);
