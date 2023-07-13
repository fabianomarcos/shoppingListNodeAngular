import { inject, injectable } from 'tsyringe';

import IProductsRepository from '../repositories/IProductsRepository';
import Product from '../infra/typeorm/entities/Products';

@injectable()
class FindProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(id: string): Promise<Product | undefined> {
    const product = await this.productsRepository.findById(id);

    return product;
  }
}

export default FindProductsService;
