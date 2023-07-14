import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import IProductsRepository from '../repositories/IProductsRepository';
import Product from '../infra/typeorm/entities/Products';

@injectable()
class UpdateProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(product: Product): Promise<Product | undefined> {
    const productFinding = await this.productsRepository.findById(product.id);

    if (!productFinding) throw new AppError('Produto inexistente.');

    const updateProduct = await this.productsRepository.update({
      ...productFinding,
      ...product,
    });

    return updateProduct;
  }
}

export default UpdateProductsService;
