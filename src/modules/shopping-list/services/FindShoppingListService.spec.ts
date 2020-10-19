import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeShoppingListRepository from '../repositories/fakes/FakeShoppingListRepository';
import FindShoppingListService from './FindShoppingListService';

let fakeShoppingListRepository: FakeShoppingListRepository;
let findShoppingListService: FindShoppingListService;
let fakeUsersRepository: FakeUsersRepository;
let fakeProductsRepository: FakeProductsRepository;

beforeEach(() => {
  fakeShoppingListRepository = new FakeShoppingListRepository();
  fakeUsersRepository = new FakeUsersRepository();
  fakeProductsRepository = new FakeProductsRepository();

  findShoppingListService = new FindShoppingListService(
    fakeShoppingListRepository,
  );
});

describe('FindShoppingList', () => {
  it('should be able to fetch a shopping list by id', async () => {
    const user = await fakeUsersRepository.create({
      email: 'teste@email.com',
      name: 'testes unitários',
      password: '123456',
    });

    const product = await fakeProductsRepository.create({
      name: 'product 1',
      price: 15.99,
      quantity: 5,
    });

    const secondProduct = await fakeProductsRepository.create({
      name: 'product 2',
      price: 185.73,
      quantity: 10,
    });

    const shoppingList = await fakeShoppingListRepository.create({
      user,
      products: [product, secondProduct],
    });

    const shopping = await findShoppingListService.execute({
      id: shoppingList.id,
    });

    expect(shopping).toHaveProperty('id');
  });

  it('should be able to return an error if the id is wrong', async () => {
    await expect(
      findShoppingListService.execute({
        id: 'user-inexistent',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to register a list only when already authenticated', async () => {
    await expect(
      findShoppingListService.execute({
        id: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
