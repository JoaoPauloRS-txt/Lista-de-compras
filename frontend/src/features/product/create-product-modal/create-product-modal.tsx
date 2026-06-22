import { Controller, useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import styles from "./create-product-modal.module.scss";
import { Input } from "../../../Components/Input/input";
import { Modal } from "../../../Components/modal/modal";
import { CategorySelect } from "../../category/category-select/category-select";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CREATE_PRODUCT_SCHEMA,
  type CreateProductFormValues,
} from "./constants";
import { usePostCreateProduct } from "./api/post-create-product";

interface CreateProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateProductModal({
  isOpen: isOpenCreateProductModal,
  onClose,
}: CreateProductModalProps) {
  const { isPending, mutate: createProduct } = usePostCreateProduct({
    onSuccess: () => {
      onClose();
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CREATE_PRODUCT_SCHEMA),
    defaultValues: {
      productName: "",
      categoryId: "",
    },
  });
  const handleSubmitForm: SubmitHandler<CreateProductFormValues> = (data) => {
    const { categoryId, productName } = data;
    createProduct({ name: productName, categoryId: categoryId });
  };

  return (
    <Modal
      title="Criar produto"
      isOpen={isOpenCreateProductModal}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <Controller
          control={control}
          name="productName"
          render={({ field: { value, onChange } }) => (
            <Input
              placeholder="Digite o nome do produto"
              label="Nome do produto"
              value={value}
              onChange={onChange}
              errorMessage={errors.productName?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="categoryId"
          render={({ field }) => {
            // console.log("categoryId do form:", value);
            console.log("field value", field.value);

            return (
              <CategorySelect
                value={field.value}
                onChange={field.onChange}
                label="Categoria"
                errorMessage={errors.categoryId?.message}
              />
            );
          }}
        />
        <div className={styles.modalActions}>
          <button onClick={onClose} className={styles.cancelButton}>
            cancelar
          </button>
          <button
            className={styles.saveButton}
            type="submit"
            disabled={isPending}
          >
            Salvar
          </button>
        </div>
      </form>
    </Modal>
  );
}
