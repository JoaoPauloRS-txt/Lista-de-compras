import { FaSearch } from "react-icons/fa";
import { Input } from "../Input/input";
import { CreateProductButton } from "./create-product-button/create-product-button";

export const Header = () => {
  return (
    <header
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        gap: "1rem",
      }}
    >
      <Input placeholder="Busque um produto..." icon={<FaSearch />} />
      <CreateProductButton
        onCreate={() => console.log("Create product clicked")}
      />
    </header>
  );
};
