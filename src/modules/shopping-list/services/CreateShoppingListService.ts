/* eslint-disable camelcase */
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IShoppingListRepository from '../repositories/IShoppingListRepository';
import ShoppingList from '../infra/typeorm/entities/ShoppingList';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  user_id: string;
  products: IProduct[];
}

@injectable()
class CreateShoppingListService {
  constructor(
    @inject('ShoppingListRepository')
    private shoppingListRepository: IShoppingListRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, products }: IRequest): Promise<ShoppingList> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Cliente não encontrado.');
    }

    const productsShoppingList = await this.productsRepository.findAllById(
      products,
    );

    if (!productsShoppingList.length) {
      throw new AppError('Produto não encontrado.');
    }

    const productsIds = productsShoppingList.map(product => product.id);

    const message = productsIds.reduce((accumulator, id) => {
      return (accumulator += id);
    }, 'Produtos não cadastrados: ');

    const checkInexistentProducts = products.filter(({ id }) => {
      return !productsIds.includes(id);
    });

    if (checkInexistentProducts.length) {
      throw new AppError(message);
    }

    const findProductsWithNoQuantityAvailable = products.filter(
      product =>
        productsShoppingList.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    );

    if (findProductsWithNoQuantityAvailable.length) {
      throw new AppError('Quantidade indisponível.');
    }

    const serializedProducts = products.map(product => ({
      id: product.id,
      quantity: product.quantity,
      price: productsShoppingList.filter(p => p.id === product.id)[0].price,
    }));

    const shoppingList = await this.shoppingListRepository.create({
      user,
      products: serializedProducts,
    });

    const { shopping_list_products } = shoppingList;

    const orderedProductsQuantity = shopping_list_products.map(product => ({
      id: product.product_id,
      quantity:
        productsShoppingList.filter(p => p.id === product.product_id)[0]
          .quantity - product.quantity,
    }));

    await this.productsRepository.updateQuantity(orderedProductsQuantity);

    return shoppingList;
  }
}

export default CreateShoppingListService;
