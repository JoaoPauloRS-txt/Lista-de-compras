import { ProductModel } from "../models/Products";

export class ProductService {
  async create(name: string, categoryId: string) {
    if (!name || !categoryId) {
      throw new Error("Name and category ID are required");
    }

    await ProductModel.create({ name, categoryId });
    return;
  }

  async list() {
    return ProductModel.find();
  }

  async delete(productId: string) {
    return ProductModel.findByIdAndDelete(productId);
  }
}
