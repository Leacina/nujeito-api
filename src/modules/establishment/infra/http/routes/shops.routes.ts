import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ShopsController from '../controllers/ShopsController';
import ShopQrCodeController from '../controllers/ShopQrCodeController';

const shopsController = new ShopsController();
const shopQrCodeController = new ShopQrCodeController();

const shopsRouter = Router();

shopsRouter.get('/qrcode/:id', shopQrCodeController.index);
shopsRouter.use(ensureAuthenticated);
shopsRouter.post('/', shopsController.create);
shopsRouter.get('/', shopsController.show);
shopsRouter.get('/:id', shopsController.index);

export default shopsRouter;
