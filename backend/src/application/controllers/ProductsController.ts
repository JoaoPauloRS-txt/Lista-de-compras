import type { Request, Response } from "express";
import { ProductService } from "../../services/product.service";

const productService = new ProductService();

export class ProductsController {
  async createProduct(req: Request, res: Response) {
    try {
      const { name } = req.body;

      const product = await productService.create(name);

      return res.status(201).json(product);
    } catch (error) {
      return res.status(400).json({
        error: (error as Error).message,
      });
    }
  }
  async getProducts(req: Request, res: Response) {
    const products = await productService.list();

    return res.json(products);
  }

  async deleteProduct(req: Request<{ productId: string }>, res: Response) {
    const { productId } = req.params;

    await productService.delete(productId);

    return res.status(204).send();
  }
}
