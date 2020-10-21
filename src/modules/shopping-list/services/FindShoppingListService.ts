import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import IShoppingListRepository from '../repositories/IShoppingListRepository';
import ShoppingList from '../infra/typeorm/entities/ShoppingList';

interface IRequest {
  id: string;
}

@injectable()
class FindShoppingListService {
  constructor(
    @inject('ShoppingListRepository')
    private shoppingListRepository: IShoppingListRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<ShoppingList | undefined> {
    const shoppingList = await this.shoppingListRepository.findById(id);

    if (!shoppingList) {
      throw new AppError('Lista de compras não encontrada');
    }

    return shoppingList;
  }

  public async showAll(): Promise<ShoppingList[]> {
    const shoppingList = await this.shoppingListRepository.findAll();

    return shoppingList;
  }
}

export default FindShoppingListService;
