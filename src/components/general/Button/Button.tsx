import styles from "components/general/Button/Button.module.scss";

interface ButtonProps {
  className?: string;
  label: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  disabled?: React.ButtonHTMLAttributes<HTMLButtonElement>['disabled'];
  onClick?: (event: React.MouseEvent) => void;
}

export default function Button({
  className,
  label, 
  type,
  disabled,
  onClick,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`${styles.wrapper} ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
