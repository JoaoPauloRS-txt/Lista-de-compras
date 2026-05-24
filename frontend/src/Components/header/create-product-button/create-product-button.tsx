import { FaPlus } from "react-icons/fa";
import styles from "./create-product-button.module.scss";

interface CreateProductButtonProps {
  onCreate: () => void;
}
export const CreateProductButton = ({ onCreate }: CreateProductButtonProps) => {
  return (
    <button className={styles.containerButton} onClick={onCreate}>
      {" "}
      <FaPlus />
    </button>
  );
};
