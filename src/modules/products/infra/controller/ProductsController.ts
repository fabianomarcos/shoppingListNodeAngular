import 'reflect-metadata';
import { Request, Response } from 'express';

import { container } from 'tsyringe';
import CreateProductService from '@modules/products/services/CreateProductService';
import FindProductsService from '@modules/products/services/FindProductsService';

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      name,
      price,
      quantity,
    });

    return response.json(product);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const findProducts = container.resolve(FindProductsService);

    const products = findProducts.execute();

    return response.json(products);
  }
}
