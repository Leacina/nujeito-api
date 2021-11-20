// eslint-disable-next-line import/no-unresolved
import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import AppError from '@shared/errors/AppError';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerJson from './swagger_output.json';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container/providers/index';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJson));

app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      error: err.message,
    });
  }
  console.log(`${err}`);
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(process.env.PORT || 3333, () => {
  console.log('Rodando backend');
});
