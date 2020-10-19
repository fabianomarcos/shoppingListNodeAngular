import AppError from '@shared/errors/AppError';
import FakeShoppingListRepository from '../repositories/fakes/FakeShoppingListRepository';
import FindShoppingListService from './FindShoppingListService';

let fakeShoppingListRepository: FakeShoppingListRepository;
let findShoppingListService: FindShoppingListService;

beforeEach(() => {
  fakeShoppingListRepository = new FakeShoppingListRepository();

  findShoppingListService = new FindShoppingListService(
    fakeShoppingListRepository,
  );
});

describe('FindShoppingList', () => {
  it('should be able to fetch a shopping list by id', async () => {
    const shopping = await findShoppingListService.execute({ id: 'user-id' });

    expect(shopping).toHaveProperty('id');
  });

  it('should be able to return an error if the id is wrong', async () => {
    await findShoppingListService.execute({
      id: 'user-id',
    });

    await expect(
      findShoppingListService.execute({
        id: 'user-inexistent',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to register a list only when already authenticated', async () => {
    await findShoppingListService.execute({
      id: 'user-id',
    });

    await expect(
      findShoppingListService.execute({
        id: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
