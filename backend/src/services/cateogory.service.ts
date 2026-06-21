import { CategoryModel } from "../models/Category";

export class CategoryService {
  async getCategories() {
    return CategoryModel.find();
  }
}
