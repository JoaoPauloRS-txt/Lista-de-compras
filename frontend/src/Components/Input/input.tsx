import type { InputHTMLAttributes, ReactNode } from "react";
import styles from "./input.module.scss";
import { FaTimesCircle } from "react-icons/fa";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
  cleanable?: boolean;
  onClear?: () => void;
  iconPosition?: "left" | "right";
}
export const Input = ({
  label,
  icon,
  iconPosition = "left",
  placeholder,
  cleanable,
  onClear,
  ...rest
}: InputProps) => {
  const showClearIcon = cleanable;
  console.log(showClearIcon);
  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputWrapper}>
        {(showClearIcon || icon) && (
          <span
            className={`${styles.icon} ${styles[iconPosition]}`}
            onClick={(e) => {
              if (!showClearIcon) return;

              e.stopPropagation();
              onClear?.();
            }}
          >
            {showClearIcon ? <FaTimesCircle color="red" /> : icon}
          </span>
        )}
        <input
          className={styles.input}
          data-has-icon={icon}
          data-icon-position={iconPosition}
          placeholder={placeholder}
          {...rest}
        />
      </div>
    </div>
  );
};
