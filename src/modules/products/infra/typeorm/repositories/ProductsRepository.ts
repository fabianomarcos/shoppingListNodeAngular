import { getRepository, Repository, In } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateProductsQuantityDTO from '@modules/products/dtos/IUpdateProductsQuantityDTO';
import Product from '../entities/Products';

interface IFindProducts {
  id: string;
}

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProductDTO): Promise<Product> {
    const product = await this.ormRepository.create({
      name,
      price,
      quantity,
      total: quantity * price,
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async findAllById(products: IFindProducts[]): Promise<Product[]> {
    const productIds = products.map(product => product.id);

    const dataProducts = await this.ormRepository.find({
      where: {
        id: In(productIds),
      },
    });

    return dataProducts;
  }

  public async updateQuantity(
    products: IUpdateProductsQuantityDTO[],
  ): Promise<Product[]> {
    await this.ormRepository.save(products);

    return products as Product[];
  }

  public async findByName(name: string): Promise<Product | undefined> {
    return this.ormRepository.findOne({
      where: {
        name,
      },
    });
  }

  public async findById(id: string): Promise<Product | undefined> {
    return this.ormRepository.findOne(id);
  }
}

export default ProductsRepository;
