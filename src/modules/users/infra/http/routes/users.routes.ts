import UsersController from '@modules/users/infra/http/controllers/UsersController';

import { Router } from 'express';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post('/', usersController.create);

export default usersRouter;
