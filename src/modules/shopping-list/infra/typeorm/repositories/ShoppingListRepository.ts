import ICreateShoppingListDTO from '@modules/shopping-list/dtos/ICreateShoppingListDTO';
import IShoppingListRepository from '@modules/shopping-list/repositories/IShoppingListRepository';
import { getRepository, Repository } from 'typeorm';
import ShoppingList from '../entities/ShoppingList';

class ShoppingListRepository implements IShoppingListRepository {
  private ormRepository: Repository<ShoppingList>;

  constructor() {
    this.ormRepository = getRepository(ShoppingList);
  }

  public async create({
    user,
    products,
  }: ICreateShoppingListDTO): Promise<ShoppingList> {
    const shoppingList = await this.ormRepository.create({
      user,
      shopping_list_products: products,
    });

    await this.ormRepository.save(shoppingList);

    return shoppingList;
  }

  public async findById(id: string): Promise<ShoppingList | undefined> {
    const shoppingList = this.ormRepository.findOne(id, {
      relations: ['shopping_list_products', 'user'],
    });

    return shoppingList;
  }

  public async findAll(): Promise<ShoppingList[]> {
    const shoppingList = this.ormRepository.findOne({
      order: {
        created_at: 'ASC',
      },
      relations: ['shopping_list_products', 'user'],
    });

    return shoppingList;
  }
}

export default ShoppingListRepository;
