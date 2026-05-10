import { ProductModel } from "../models/Products";

export class ProductService {
  async create(name: string) {
    if (!name) {
      throw new Error("Name is required");
    }

    const product = await ProductModel.create({ name });
    return product;
  }

  async list() {
    return ProductModel.find();
  }

  async delete(productId: string) {
    return ProductModel.findByIdAndDelete(productId);
  }
}
