import { FaSearch } from "react-icons/fa";
import { Input } from "../Input/input";
import { CreateProductButton } from "./create-product-button/create-product-button";
import { useState } from "react";
import { Modal } from "../modal/modal";
import { CategorySelect } from "../category-select/category-select";

export const Header = () => {
  const [isOpenCreateProductModal, setIsOpenCreateProductModal] =
    useState(false);
  function handleCreateProduct() {
    setIsOpenCreateProductModal(true);
  }
  const categories = [
    { id: 1, name: "Bebidas" },
    { id: 2, name: "Laticínios" },
    { id: 3, name: "Carnes" },
    { id: 4, name: "Hortifruti" },
  ];
  return (
    <>
      <header
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <Input placeholder="Busque um produto..." icon={<FaSearch />} />
        <CreateProductButton onCreate={handleCreateProduct} />
      </header>
      {isOpenCreateProductModal && (
        <Modal
          title="Criar produto"
          isOpen={isOpenCreateProductModal}
          onClose={() => setIsOpenCreateProductModal(false)}
        >
          <Input
            placeholder="Digite o nome do produto"
            label="Nome do produto"
          />
          <CategorySelect
            onChange={() => {}}
            options={categories}
            label="Categoria"
          />
        </Modal>
      )}
    </>
  );
};
