import 'reflect-metadata';
import { Request, Response } from 'express';

import { container } from 'tsyringe';
import CreateProductService from '@modules/products/services/CreateProductService';
import FindProductsService from '@modules/products/services/FindProductsService';
import UpdateProductsService from '@modules/products/services/UpdateProductsService';
import DeleteProductsService from '@modules/products/services/DeleteProductsService';

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

    const products = await findProducts.execute();

    return response.json(products);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateProduct = container.resolve(UpdateProductsService);

    const product = request.body;

    updateProduct.execute(product);

    return response.json(updateProduct);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteProduct = container.resolve(DeleteProductsService);

    const { id } = request.params;

    deleteProduct.execute(id);

    return response
      .json({ message: 'Produto deletado com sucesso' })
      .status(204);
  }
}
