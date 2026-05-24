import type { Express } from "express";
import express from "express";
import routes from "./routes.js";
import cors from "cors";

const app: Express = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use(routes);

export default app;
