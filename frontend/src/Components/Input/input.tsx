import type { InputHTMLAttributes, ReactNode } from "react";
import styles from "./input.module.scss";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
}
export const Input = ({ label, icon, ...rest }: InputProps) => {
  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputWrapper}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <input className={styles.input} {...rest} />
      </div>
    </div>
  );
};
