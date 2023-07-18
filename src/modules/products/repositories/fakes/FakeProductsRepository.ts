import { v4 as uuid } from 'uuid';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateProductsQuantityDTO from '@modules/products/dtos/IUpdateProductsQuantityDTO';
import Product from '@modules/products/infra/typeorm/entities/Products';
import AppError from '@shared/errors/AppError';

interface IFindProducts {
  id: string;
}

class FakeProductsRepository implements IProductsRepository {
  private products: Product[] = [];

  public async findAll(): Promise<Product[]> {
    return this.products;
  }

  async update(product: Product): Promise<Product> {
    const productFindIndex = this.products.findIndex(p => p.id === product.id);
    if (productFindIndex === -1) throw new AppError('Produto não encontrado');

    this.products[productFindIndex] = product;
    return product;
  }

  async delete(id: string) {
    const product = this.products.find(p => p.id === id);
    if (!product) throw new AppError('Produto não encontrado');
    this.products.filter(p => p.id !== id);
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProductDTO): Promise<Product> {
    const product = new Product();
    Object.assign(product, {
      id: uuid(),
      name,
      price,
      quantity,
      total: quantity * price,
    });

    this.products.push(product);

    return product;
  }

  public async findAllById(products: IFindProducts[]): Promise<Product[]> {
    const productIds = products.map(product => product.id);

    const findProducts = this.products.filter(product => {
      return productIds.filter(id => product.id === id);
    });

    return findProducts;
  }

  public async updateQuantity(
    products: IUpdateProductsQuantityDTO[],
  ): Promise<Product[]> {
    return products as Product[];
  }

  public async findByName(name: string): Promise<Product | undefined> {
    return this.products.find(p => p.name === name);
  }

  public async findById(id: string): Promise<Product | undefined> {
    return this.products.find(product => product.id === id);
  }
}

export default FakeProductsRepository;
