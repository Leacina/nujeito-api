// src/routes/index.ts
import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import establishmentsRouter from '@modules/establishment/infra/http/routes/establishments.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import productsRouter from '@modules/product/infra/http/routes/product.routes';

const routes = Router();

routes.use('/api/usuario', usersRouter);
routes.use('/api/signin', sessionsRouter);
routes.use('/api/estabelecimento', establishmentsRouter);
routes.use('/api/produto', productsRouter);

export default routes;
