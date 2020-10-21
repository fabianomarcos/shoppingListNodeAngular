import { v4 as uuid } from 'uuid';

import ICreateShoppingListDTO from '@modules/shopping-list/dtos/ICreateShoppingListDTO';
import ShoppingList from '@modules/shopping-list/infra/typeorm/entities/ShoppingList';
import IShoppingListRepository from '@modules/shopping-list/repositories/IShoppingListRepository';

class FakeShoppingListRepository implements IShoppingListRepository {
  private shoppingList: ShoppingList[] = [];

  public async create({
    user,
    products,
  }: ICreateShoppingListDTO): Promise<ShoppingList> {
    const shopping = new ShoppingList();

    Object.assign(
      shopping,
      { shopping_list_products: products },
      { id: uuid(), user },
    );

    this.shoppingList.push(shopping);

    return shopping;
  }

  public async findById(id: string): Promise<ShoppingList | undefined> {
    const shoppingList = this.shoppingList.find(shopping => shopping.id === id);

    return shoppingList;
  }
}

export default FakeShoppingListRepository;
