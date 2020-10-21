import { inject, injectable } from 'tsyringe';

import IProductsRepository from '../repositories/IProductsRepository';
import Product from '../infra/typeorm/entities/Products';

@injectable()
class FindProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(): Promise<Product[]> {
    const products = await this.productsRepository.findAll();

    return products;
  }
}

export default FindProductsService;
