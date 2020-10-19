import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeShoppingListRepository from '../repositories/fakes/FakeShoppingListRepository';
import CreateShoppingListService from './CreateShoppingListService';

let createShoppingListService: CreateShoppingListService;
let fakeShoppingListRepository: FakeShoppingListRepository;
let fakeProductsRepository: FakeProductsRepository;
let fakeUsersRepository: FakeUsersRepository;

beforeEach(() => {
  fakeShoppingListRepository = new FakeShoppingListRepository();
  fakeUsersRepository = new FakeUsersRepository();
  fakeProductsRepository = new FakeProductsRepository();

  createShoppingListService = new CreateShoppingListService(
    fakeShoppingListRepository,
    fakeProductsRepository,
    fakeUsersRepository,
  );
});

describe('CreateShoppingList', () => {
  it('should be able to register a new shopping list', async () => {
    const user = await fakeUsersRepository.create({
      name: 'user-name',
      email: 'user@gmail.com',
      password: '123456',
    });

    const product = await fakeProductsRepository.create({
      name: 'product 1',
      price: 15.99,
      quantity: 5,
    });

    const secondProduct = await fakeProductsRepository.create({
      name: 'product 2',
      price: 18.59,
      quantity: 51,
    });

    const shopping = await createShoppingListService.execute({
      user_id: user.id,
      products: [
        {
          id: product.id,
          quantity: 1,
        },
        {
          id: secondProduct.id,
          quantity: 2,
        },
      ],
    });

    expect(shopping).toHaveProperty('id');
  });

  it('should be able to register a list only when already authenticated', async () => {
    const user = await fakeUsersRepository.create({
      name: 'user-name',
      email: 'user@gmail.com',
      password: '123456',
    });

    const product = await fakeProductsRepository.create({
      name: 'product 1',
      price: 15.99,
      quantity: 5,
    });

    const secondProduct = await fakeProductsRepository.create({
      name: 'product 2',
      price: 18.59,
      quantity: 51,
    });

    await expect(
      createShoppingListService.execute({
        user_id: user.id,
        products: [
          {
            id: product.id,
            quantity: 1,
          },
          {
            id: secondProduct.id,
            quantity: 1,
          },
          {
            id: 'non-existent-product',
            quantity: 1,
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to register a list only when already authenticated', async () => {
    await expect(
      createShoppingListService.execute({
        user_id: 'non-user-id',
        products: [
          {
            id: '1',
            quantity: 1,
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to find Products without Quantity Available', async () => {
    const user = await fakeUsersRepository.create({
      name: 'user-name',
      email: 'user@gmail.com',
      password: '123456',
    });

    const product = await fakeProductsRepository.create({
      name: 'product 1',
      price: 15.99,
      quantity: 5,
    });

    const secondProduct = await fakeProductsRepository.create({
      name: 'product 2',
      price: 18.59,
      quantity: 5,
    });

    await expect(
      createShoppingListService.execute({
        user_id: user.id,
        products: [
          {
            id: product.id,
            quantity: 1,
          },
          {
            id: secondProduct.id,
            quantity: 6,
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to return a list without products', async () => {
    const user = await fakeUsersRepository.create({
      name: 'user-name',
      email: 'user@gmail.com',
      password: '123456',
    });

    await expect(
      createShoppingListService.execute({
        user_id: user.id,
        products: [
          {
            id: 'non-product',
            quantity: 1,
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
