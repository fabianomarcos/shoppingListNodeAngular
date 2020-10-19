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

  createShoppingListService = new CreateShoppingListService(
    fakeShoppingListRepository,
    fakeProductsRepository,
    fakeUsersRepository,
  );
});

describe('CreateShoppingList', () => {
  it('should be able to register a new shopping list', async () => {
    const shopping = await createShoppingListService.execute({
      user_id: 'user-id',
      products: [
        {
          id: '1',
          quantity: 1,
        },
        {
          id: '2',
          quantity: 2,
        },
        {
          id: '3',
          quantity: 3,
        },
      ],
    });

    expect(shopping).toHaveProperty('id');
  });

  it('should be able to register a list only when already authenticated', async () => {
    await createShoppingListService.execute({
      user_id: 'user-id',
      products: [
        {
          id: '1',
          quantity: 1,
        },
        {
          id: 'product.id',
          quantity: 1,
        },
      ],
    });

    await expect(
      createShoppingListService.execute({
        user_id: 'user-id',
        products: [
          {
            id: '1',
            quantity: 1,
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to register a list only when already authenticated', async () => {
    await createShoppingListService.execute({
      user_id: 'user-id',
      products: [
        {
          id: '1',
          quantity: 1,
        },
      ],
    });

    await expect(
      createShoppingListService.execute({
        user_id: 'user-id',
        products: [
          {
            id: '1',
            quantity: 1,
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
