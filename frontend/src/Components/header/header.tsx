import { FaSearch } from "react-icons/fa";
import { Input } from "../Input/input";
import { CreateProductButton } from "../../features/product/create-product-button/create-product-button";
import { useState } from "react";
import { CreateProductModal } from "../../features/product/create-product-modal/create-product-modal";

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
        <CreateProductModal
          isOpen={isOpenCreateProductModal}
          onClose={() => setIsOpenCreateProductModal(false)}
        />
      )}
    </>
  );
};
