import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ShopsController from '../controllers/ShopsController';

const shopsController = new ShopsController();

const shopsRouter = Router();

shopsRouter.use(ensureAuthenticated);
shopsRouter.post('/', shopsController.create);
shopsRouter.get('/', shopsController.show);
shopsRouter.get('/:id', shopsController.index);

export default shopsRouter;
