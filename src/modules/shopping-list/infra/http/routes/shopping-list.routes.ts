import { Router } from 'express';

import ShoppingListController from '../controller/ShoppingListController';

const ShoppingListRouter = Router();
const shoppingListController = new ShoppingListController();

ShoppingListRouter.post('/', shoppingListController.create);
ShoppingListRouter.get('/:id', shoppingListController.show);

export default ShoppingListRouter;
