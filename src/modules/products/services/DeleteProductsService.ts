import { inject, injectable } from 'tsyringe';

import IProductsRepository from '../repositories/IProductsRepository';

@injectable()
class DeleteProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    await this.productsRepository.delete(id);
  }
}

export default DeleteProductsService;
