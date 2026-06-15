import { ProductModel } from "../models/Products";

export class ProductService {
  async create(name: string, categoryId: string) {
    console.log(name, categoryId);
    if (!name || !categoryId) {
      throw new Error("Name and category ID are required");
    }

    const product = await ProductModel.create({ name, categoryId });
    return product;
  }

  async list() {
    return ProductModel.find();
  }

  async delete(productId: string) {
    return ProductModel.findByIdAndDelete(productId);
  }
}
