import { container } from 'tsyringe';

import '@modules/users/providers';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import IShoppingListRepository from '@modules/shopping-list/repositories/IShoppingListRepository';
import ShoppingListRepository from '@modules/shopping-list/infra/typeorm/repositories/ShoppingListRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IShoppingListRepository>(
  'ShoppingListRepository',
  ShoppingListRepository,
);
