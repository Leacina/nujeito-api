import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import SalesController from '../controllers/SalesController';

const salesRouter = Router();
const salesController = new SalesController();

salesRouter.use(ensureAuthenticated);
salesRouter.post('/', salesController.create);
salesRouter.get('/', salesController.show);

export default salesRouter;
