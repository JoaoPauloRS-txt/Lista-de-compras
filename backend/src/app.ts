import type { Express } from "express";
import express from "express";
import routes from "./routes.js";

const app: Express = express();

app.use(express.json());

app.use(routes);

export default app;
