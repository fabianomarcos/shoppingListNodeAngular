import AppError from '@shared/errors/AppError';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import CreateProductService from './CreateProductService';

let createProductService: CreateProductService;
let fakeProductsRepository: FakeProductsRepository;

beforeEach(() => {
  fakeProductsRepository = new FakeProductsRepository();

  createProductService = new CreateProductService(fakeProductsRepository);
});

describe('CreateProduct', () => {
  it('should be able to register a new product', async () => {
    const product = await createProductService.execute({
      name: 'product 1',
      price: 15.99,
      quantity: 5,
    });

    expect(product).toHaveProperty('id');
  });

  it('should not be able to register a product already registered', async () => {
    await createProductService.execute({
      name: 'product 1',
      price: 15.99,
      quantity: 5,
    });

    await expect(
      createProductService.execute({
        name: 'product 1',
        price: 15.99,
        quantity: 5,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
