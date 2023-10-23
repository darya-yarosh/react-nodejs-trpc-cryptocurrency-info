import { SortOrder } from "models/Interface";

import Icon from "components/general/Icon/Icon";

import styles from "components/general/SortIcon/Sorticon.module.scss";

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
        /images/sort/sort-${
          isEnabled && isSelected
            ? sortOrder.toLowerCase()
            : isEnabled
            ? "enabled"
            : "disabled"
        }.svg`;
  const alt = `sort icon for ${sortType}`;

  return <Icon iconSVG={src} alt={alt} />
}
