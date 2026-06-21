interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

import styles from "./modal.module.scss";

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlayStyle}>
      <div role="dialog" className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <header>{title}</header>
          <button onClick={onClose}>✕</button>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
}
