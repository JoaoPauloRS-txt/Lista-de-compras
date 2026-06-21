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

interface CreateProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateProductModal({
  isOpen: isOpenCreateProductModal,
  onClose,
}: CreateProductModalProps) {
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
    console.log("teste", data);
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
          render={({ field: { value, onChange } }) => (
            <CategorySelect
              value={value}
              onChange={onChange}
              label="Categoria"
              errorMessage={errors.categoryId?.message}
            />
          )}
        />
        <div className={styles.modalActions}>
          <button onClick={onClose} className={styles.cancelButton}>
            cancelar
          </button>
          <button className={styles.saveButton} type="submit">
            Salvar
          </button>
        </div>
      </form>
    </Modal>
  );
}
