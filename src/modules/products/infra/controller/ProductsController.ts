import 'reflect-metadata';
import { Request, Response } from 'express';

import { container } from 'tsyringe';
import CreateProductService from '@modules/products/services/CreateProductService';
import FindProductsService from '@modules/products/services/FindProductsService';
import FindProductByIdService from '@modules/products/services/FindByIdProductsService';
import UpdateProductsService from '@modules/products/services/UpdateProductsService';
import DeleteProductsService from '@modules/products/services/DeleteProductsService';
import Product from '@modules/products/infra/typeorm/entities/Products';
import AppError from '@shared/errors/AppError';

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

  public async getById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const productService = container.resolve(FindProductByIdService);

    const product = await productService.execute(id);

    if (!product) throw new AppError('Produto não encontrado');

    return response.json({ product });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateProduct = container.resolve(UpdateProductsService);

    const product = request.body as Product;
    const { id } = request.params;

    const updatedProduct = await updateProduct.execute({
      ...product,
      id,
      price: product.price * 100,
      total: product.quantity * product.price * 100,
    });

    return response.json({ product: updatedProduct });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const productService = container.resolve(DeleteProductsService);
    const findProductService = container.resolve(FindProductByIdService);

    const { id } = request.params;

    const product = await findProductService.execute(id);

    if (!product) throw new AppError('Produto não encontrado');

    productService.execute(id);

    return response
      .json({ message: 'Produto deletado com sucesso' })
      .status(204);
  }
}
