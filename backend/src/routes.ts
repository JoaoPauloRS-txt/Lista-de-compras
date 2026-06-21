import { Router } from "express";
import { ProductsController } from "./application/controllers/ProductsController";
import { CategoryController } from "./application/controllers/CategoryController";

const routes = Router();

const productsController = new ProductsController();
const categoryController = new CategoryController();

routes.get("/categories", categoryController.getCategories);

routes.post("/products", productsController.createProduct);
routes.get("/products", productsController.getProducts);
routes.delete("/products/:productId", productsController.deleteProduct);

export default routes;
