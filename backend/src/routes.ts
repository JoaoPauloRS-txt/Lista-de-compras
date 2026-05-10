import { Router } from "express";
import { ProductsController } from "./application/controllers/ProductsController";

const routes = Router();

const productsController = new ProductsController();

routes.post("/products", productsController.createProduct);
routes.get("/products", productsController.getProducts);
routes.delete("/products/:productId", productsController.deleteProduct);

export default routes;
