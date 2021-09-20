// src/routes/index.ts
import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/api/usuario', usersRouter);
routes.use('/api/signin', sessionsRouter);

export default routes;
