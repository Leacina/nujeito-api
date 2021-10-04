import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProductsController from '../controllers/ProductsController';
import ProductsByBarCodeController from '../controllers/ProductsByBarCodeController';
import ProductsEstablishmentController from '../controllers/ProductsEstablishmentController';

const productsController = new ProductsController();
const productsByBarCodeController = new ProductsByBarCodeController();
const productsEstablishmentController = new ProductsEstablishmentController();

const establishmentsRouter = Router();

establishmentsRouter.use(ensureAuthenticated);
establishmentsRouter.post('/', productsController.create);
establishmentsRouter.get(
  '/estabelecimento/:id',
  productsEstablishmentController.show,
);
establishmentsRouter.get('/:id', productsController.index);
establishmentsRouter.get(
  'codigobarras/:codigo',
  productsByBarCodeController.index,
);

export default establishmentsRouter;
