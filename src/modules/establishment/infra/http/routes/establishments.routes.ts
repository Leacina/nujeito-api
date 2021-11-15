import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import EstablishmentsController from '../controllers/EstablishmentsController';
import EstablishmentQrCodeController from '../controllers/EstablishmentQrCodeController';

const establishmentsController = new EstablishmentsController();
const establishmentQrCodeController = new EstablishmentQrCodeController();

const establishmentsRouter = Router();

establishmentsRouter.get('/qrcode/:id', establishmentQrCodeController.index);
establishmentsRouter.use(ensureAuthenticated);
establishmentsRouter.post('/', establishmentsController.create);
establishmentsRouter.get('/', establishmentsController.show);
establishmentsRouter.get('/:id', establishmentsController.index);

export default establishmentsRouter;
