import { Router } from 'express';
import ProductsController from '../controller/ProductsController';

const productsRouter = Router();
const productsController = new ProductsController();

// productsRouter.use(ensureAuthenticated);

productsRouter.post('/register', productsController.create);
productsRouter.get('/', productsController.show);
productsRouter.get('/:id', productsController.getById);
productsRouter.put('/:id', productsController.update);
productsRouter.delete('/:id', productsController.delete);

export default productsRouter;
