import styles from "components/general/Button/Button.module.scss";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

export default function Button({
  label,
  onClick
}: ButtonProps) {
  return <button className={styles.wrapper} onClick={onClick}>{label}</button>;
}
