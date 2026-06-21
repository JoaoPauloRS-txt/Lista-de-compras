import { object, string, type InferType } from "yup";

export const CREATE_PRODUCT_SCHEMA = object({
  productName: string()
    .min(2, "O nome do produto deve conter pelo menos 2 caracteres")
    .max(20, "O nome do produto deve conter no máximo 20 caracteres")
    .required("O nome do produto é obrigatório"),
  categoryId: string().required("A categoria do produto é obrigatória"),
});
export type CreateProductFormValues = InferType<typeof CREATE_PRODUCT_SCHEMA>;
