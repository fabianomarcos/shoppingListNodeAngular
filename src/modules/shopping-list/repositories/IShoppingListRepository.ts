import ICreateShoppingListDTO from '../dtos/ICreateShoppingListDTO';
import ShoppingList from '../infra/typeorm/entities/ShoppingList';

export default interface IShoppingListRepository {
  create(data: ICreateShoppingListDTO): Promise<ShoppingList>;
  findById(id: string): Promise<ShoppingList | undefined>;
}
