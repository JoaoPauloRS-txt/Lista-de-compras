import type { Request, Response } from "express";
import { CategoryService } from "../../services/cateogory.service";

const categoryService = new CategoryService();

export class CategoryController {
  async getCategories(req: Request, res: Response) {
    const categories = await categoryService.getCategories();

    return res.json(categories);
  }
}
