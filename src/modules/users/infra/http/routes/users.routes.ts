import { Router } from 'express';

// import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UsersController from '../controllers/UsersController';

const usersController = new UsersController();

const usersRouter = Router();

usersRouter.post('/', usersController.create);

export default usersRouter;
