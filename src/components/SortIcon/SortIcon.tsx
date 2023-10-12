import { SortOrder } from "models/Interface";

import styles from "components/SortIcon/Sorticon.module.scss";

interface SortIconProps {
  sortType: string;
  sortOrder: SortOrder;
  isEnabled: boolean;
  isSelected: boolean;
}

export default function SortIcon({
  sortType,
  sortOrder,
  isEnabled,
  isSelected,
}: SortIconProps) {
  const src = `
        images/sort/sort-${
          isEnabled && isSelected
            ? sortOrder.toLowerCase()
            : isEnabled
            ? "enabled"
            : "disabled"
        }.svg`;
  const alt = `sort icon for ${sortType}`;

  return <img className={styles.icon} src={`${src}`} alt={alt} />;
}
