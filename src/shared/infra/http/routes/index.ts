import productsRouter from '@modules/products/infra/routes/products.routes';
import ShoppingListRouter from '@modules/shopping-list/infra/http/routes/shopping-list.routes';
import sessionsRouter from '@modules/users/infra/http/routes/session.routes';
import { Router } from 'express';
import usersRouter from '../../../../modules/users/infra/http/routes/users.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/products', productsRouter);
routes.use('/shopping-list', ShoppingListRouter);

export default routes;
