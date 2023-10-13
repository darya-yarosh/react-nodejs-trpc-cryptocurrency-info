import styles from "components/general/IconButton/IconButton.module.scss";

interface IconButtonProps {
  iconSVG: string;
  caption: string;
  onClick: (event: React.MouseEvent) => void;
  sizePX?: number;
}

export default function IconButton({
  iconSVG,
  caption,
  onClick,
  sizePX = 28,
}: IconButtonProps) {
  const wrapperSize = `${sizePX}px`;
  const iconSize = `${sizePX - 8}px`;

  return (
    <button
      className={styles.wrapper}
      onClick={onClick}
      type="button"
      style={{ width: wrapperSize, height: wrapperSize }}
    >
      <img
        className={styles.icon}
        src={iconSVG}
        alt={caption}
        style={{ width: iconSize, height: iconSize }}
      />
    </button>
  );
}
