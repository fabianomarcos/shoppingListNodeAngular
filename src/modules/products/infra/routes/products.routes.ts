import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthetication';
import { Router } from 'express';
import ProductsController from '../controller/ProductsController';

const productsRouter = Router();
const productsController = new ProductsController();

// productsRouter.use(ensureAuthenticated);

productsRouter.post('/', productsController.create);
productsRouter.get('/', productsController.show);

export default productsRouter;
