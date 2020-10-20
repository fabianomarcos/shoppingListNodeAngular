import ICreateProductDTO from '../dtos/ICreateProductDTO';
import IUpdateProductsQuantityDTO from '../dtos/IUpdateProductsQuantityDTO';
import Product from '../infra/typeorm/entities/Products';

interface IFindProducts {
  id: string;
}

export default interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  findByName(name: string): Promise<Product | undefined>;
  findAllById(products: IFindProducts[]): Promise<Product[]>;
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | undefined>;
  updateQuantity(products: IUpdateProductsQuantityDTO[]): Promise<Product[]>;
}
