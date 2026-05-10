import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import app from "../app.js";
import { ProductModel } from "../models/Products.js";

describe("POST /products", () => {
  beforeEach(async () => {
    await ProductModel.deleteMany({});
  });

  it("cria produto e retorna 201", async () => {
    const response = await request(app)
      .post("/products")
      .send({ name: "ovos" })
      .expect(201);

    expect(response.body).toMatchObject({ name: "ovos" });
    expect(response.body._id).toBeDefined();
  });

  it("retorna 400 quando o nome está ausente", async () => {
    const response = await request(app).post("/products").send({}).expect(400);

    expect(response.body).toMatchObject({
      error: "Name is required",
    });
  });

  it("retorna 400 quando o nome é string vazia", async () => {
    const response = await request(app)
      .post("/products")
      .send({ name: "" })
      .expect(400);

    expect(response.body.error).toBe("Name is required");
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
    await ProductModel.create({ name: "leite" });
    await ProductModel.create({ name: "pão" });

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
    const { _id } = await ProductModel.create({ name: "açúcar" });

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
