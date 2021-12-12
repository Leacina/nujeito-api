import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';
import SessionsLogistController from '../controllers/SessionsLogistController';

const sessionsRouter = Router();
const sessionsController = new SessionsController();
const sessionsLogistController = new SessionsLogistController();

sessionsRouter.post('/', sessionsController.create);
sessionsRouter.post('/logista', sessionsLogistController.create);

export default sessionsRouter;
