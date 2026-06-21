import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import app from "../app.js";
import { ProductModel } from "../models/Products.js";
import { CategoryModel } from "../models/Category.js";

describe("POST /products", () => {
  beforeEach(async () => {
    await ProductModel.deleteMany({});
  });

  it("cria produto e retorna 201", async () => {
    const response = await request(app)
      .post("/products")
      .send({ name: "ovos", categoryId: "507f1f77bcf86cd799439011" })
      .expect(201);

    expect(response.body).toMatchObject({
      name: "ovos",
      categoryId: "507f1f77bcf86cd799439011",
    });
    expect(response.body._id).toBeDefined();
  });

  it("retorna 400 quando o nome está ausente", async () => {
    const response = await request(app).post("/products").send({}).expect(400);

    expect(response.body).toMatchObject({
      error: "Name and category ID are required",
    });
  });

  it("retorna 400 quando o nome é string vazia", async () => {
    const response = await request(app)
      .post("/products")
      .send({ name: "" })
      .expect(400);

    expect(response.body.error).toBe("Name and category ID are required");
  });
});

describe("GET /products", () => {
  beforeEach(async () => {
    await ProductModel.deleteMany({});
  });

  it("retorna lista vazia quando não há produtos", async () => {
    const response = await request(app).get("/products").expect(200);

    expect(response.body).toEqual([]);
  });

  it("retorna os produtos cadastrados", async () => {
    await ProductModel.create({
      name: "leite",
      categoryId: "507f1f77bcf86cd799439011",
    });
    await ProductModel.create({
      name: "pão",
      categoryId: "507f1f77bcf86cd799439011",
    });

    const response = await request(app).get("/products").expect(200);

    expect(response.body).toHaveLength(2);
    const names = response.body.map((p: { name: string }) => p.name).sort();
    expect(names).toEqual(["leite", "pão"]);
  });
});

describe("DELETE /products/:productId", () => {
  beforeEach(async () => {
    await ProductModel.deleteMany({});
  });

  it("remove produto e retorna 204", async () => {
    const { _id } = await ProductModel.create({
      name: "açúcar",
      categoryId: "507f1f77bcf86cd799439011",
    });

    await request(app)
      .delete(`/products/${String(_id)}`)
      .expect(204);

    const restantes = await ProductModel.find();
    expect(restantes).toHaveLength(0);
  });

  it("aceita id válido inexistente e ainda retorna 204", async () => {
    const idInexistente = "507f1f77bcf86cd799439011";

    await request(app).delete(`/products/${idInexistente}`).expect(204);
  });
});

describe("GET /categories", () => {
  beforeEach(async () => {
    await CategoryModel.deleteMany({});
  });
  it("retorna categorias", async () => {
    await CategoryModel.create({ name: "Bebidas" });
    await CategoryModel.create({ name: "Laticínios" });

    const response = await request(app).get("/categories").expect(200);

    const names = response.body.map((c: { name: string }) => c.name).sort();
    expect(names).toEqual(["Bebidas", "Laticínios"]);
  });
});
