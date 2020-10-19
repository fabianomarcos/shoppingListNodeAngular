/* eslint-disable camelcase */
import CreateShoppingListService from '@modules/shopping-list/services/CreateShoppingListService';
import FindShoppingListService from '@modules/shopping-list/services/FindShoppingListService';
import { Request, Response } from 'express';

import { container } from 'tsyringe';

export default class ShoppingListController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findShoppingList = container.resolve(FindShoppingListService);

    const shoppingList = await findShoppingList.execute({ id });

    return response.json(shoppingList);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createShoppingList = container.resolve(CreateShoppingListService);

    const user_id = request.user.id;

    const { products } = request.body;

    const shoppingList = await createShoppingList.execute({
      user_id,
      products,
    });

    return response.json(shoppingList);
  }
}
