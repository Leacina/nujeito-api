/**
 * Injeção de dependências
 */
import { container } from 'tsyringe';

import { ISalesItemsRepository } from '../repositories/ISalesItemsRepository';
import { SalesItemsRepository } from '../infra/typeorm/repositories/SalesItemsRepository';

import { ISalesRepository } from '../repositories/ISalesRepository';
import { SalesRepository } from '../infra/typeorm/repositories/SalesRepository';

container.registerSingleton<ISalesItemsRepository>(
  'SalesItemsRepository',
  SalesItemsRepository,
);

container.registerSingleton<ISalesRepository>(
  'SalesRepository',
  SalesRepository,
);
