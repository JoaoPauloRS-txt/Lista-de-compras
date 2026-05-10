import mongoose from "mongoose";
import { afterAll, beforeAll } from "vitest";
import { connectDatabase } from "../database/connection.js";

beforeAll(async () => {
  await connectDatabase();
});

afterAll(async () => {
  await mongoose.disconnect();
});
