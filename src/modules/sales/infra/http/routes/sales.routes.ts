import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import SalesController from '../controllers/SalesController';
import SalesDoneController from '../controllers/SalesDoneController';

const salesRouter = Router();
const salesController = new SalesController();
const salesDoneController = new SalesDoneController();

salesRouter.use(ensureAuthenticated);
salesRouter.post('/', salesController.create);
salesRouter.put('/:id/processada', salesDoneController.store);
salesRouter.put('/:id', salesController.store);
salesRouter.post('/relatorio', salesController.show);
salesRouter.get('/relatorio', salesController.show);

export default salesRouter;
