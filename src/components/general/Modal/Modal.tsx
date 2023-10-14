import styles from "components/general/Modal/Modal.module.scss";

interface ModalProps {
  handleDismiss: () => void;
  children: React.ReactNode;
}

export default function Module({ handleDismiss, children }: ModalProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.backdrop} onClick={handleDismiss} />
      <div className={styles.drawer}>{children}</div>
    </div>
  );
}
