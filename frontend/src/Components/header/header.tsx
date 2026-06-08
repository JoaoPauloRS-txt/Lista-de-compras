import { FaSearch } from "react-icons/fa";
import { Input } from "../Input/input";
import { CreateProductButton } from "./create-product-button/create-product-button";
import { useState } from "react";
import { Modal } from "../modal/modal";

export const Header = () => {
  const [isOpenCreateProductModal, setIsOpenCreateProductModal] =
    useState(false);
  function handleCreateProduct() {
    setIsOpenCreateProductModal(true);
  }
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
          teste de modal
        </Modal>
      )}
    </>
  );
};
