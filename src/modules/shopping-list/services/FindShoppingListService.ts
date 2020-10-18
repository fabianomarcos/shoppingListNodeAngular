import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
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
      throw new AppError('Ordem de compra não encontrada');
    }

    return shoppingList;
  }
}

export default FindShoppingListService;
