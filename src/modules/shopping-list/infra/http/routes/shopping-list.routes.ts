import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthetication';
import { Router } from 'express';

import ShoppingListController from '../controller/ShoppingListController';

const shoppingListRouter = Router();
const shoppingListController = new ShoppingListController();

// shoppingListRouter.use(ensureAuthenticated);

shoppingListRouter.post('/', shoppingListController.create);
shoppingListRouter.get('/', shoppingListController.showAll);
shoppingListRouter.get('/:id', shoppingListController.show);

export default shoppingListRouter;
