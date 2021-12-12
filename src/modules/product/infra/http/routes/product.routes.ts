import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProductsController from '../controllers/ProductsController';
import ProductsByBarCodeController from '../controllers/ProductsByBarCodeController';
import ProductsShopController from '../controllers/ProductsShopController';
import ProductsEstablishmentController from '../controllers/ProductsEstablismentController';

const productsController = new ProductsController();
const productsByBarCodeController = new ProductsByBarCodeController();
const productsShopController = new ProductsShopController();
const productsEstablishmentController = new ProductsEstablishmentController();

const establishmentsRouter = Router();

establishmentsRouter.use(ensureAuthenticated);
establishmentsRouter.post('/', productsController.create);
establishmentsRouter.put('/:id', productsController.store);
establishmentsRouter.get('/', productsController.show);
establishmentsRouter.get(
  '/estabelecimento/loja/:id',
  productsShopController.show,
);
establishmentsRouter.get(
  '/estabelecimento/:id',
  productsEstablishmentController.show,
);
establishmentsRouter.get('/:codigo/:loja', productsByBarCodeController.index);
establishmentsRouter.get('/:id', productsController.index);

export default establishmentsRouter;
