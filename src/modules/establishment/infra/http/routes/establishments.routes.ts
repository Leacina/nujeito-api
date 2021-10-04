import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import EstablishmentsController from '../controllers/EstablishmentsController';

const establishmentsController = new EstablishmentsController();

const establishmentsRouter = Router();

establishmentsRouter.use(ensureAuthenticated);
establishmentsRouter.post('/', establishmentsController.create);
establishmentsRouter.get('/', establishmentsController.show);
establishmentsRouter.get('/:id', establishmentsController.index);

export default establishmentsRouter;
