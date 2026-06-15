import type { Document, Types } from "mongoose";
import mongoose, { Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  categoryId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ProductModel = mongoose.model<IProduct>("Product", ProductSchema);
