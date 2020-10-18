import sessionsRouter from '@modules/users/infra/http/routes/session.routes';
import { Router } from 'express';
import usersRouter from '../../../../modules/users/infra/http/routes/users.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
