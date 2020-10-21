import { inject, injectable } from 'tsyringe';

import IProductsRepository from '../repositories/IProductsRepository';
import Product from '../infra/typeorm/entities/Products';

@injectable()
class UpdateProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(product: Product): Promise<Product> {
    const updateProduct = await this.productsRepository.update(product);

    return updateProduct;
  }
}

export default UpdateProductsService;
