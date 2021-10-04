/**
 * Injeção de dependências
 */
import { container } from 'tsyringe';

import IEstablishmentsRepository from '../repositories/IEstablishmentsRepository';
import EstablishmentsRepository from '../infra/typeorm/repositories/EstablishmentsRepository';

container.registerSingleton<IEstablishmentsRepository>(
  'EstablishmentsRepository',
  EstablishmentsRepository,
);
