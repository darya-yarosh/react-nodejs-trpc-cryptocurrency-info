import { memo } from "react";

import { SortOrder } from "models/Interface";

import Icon from "components/general/Icon/Icon";

interface SortIconProps {
  sortType: string;
  sortOrder: SortOrder;
  isEnabled: boolean;
  isSelected: boolean;
}

function SortIcon({
  sortType,
  sortOrder,
  isEnabled,
  isSelected,
}: SortIconProps) {
  const src = `
        /images/sort/sort-${isEnabled && isSelected
      ? sortOrder.toLowerCase()
      : isEnabled
        ? "enabled"
        : "disabled"
    }.svg`;
  const alt = `sort icon for ${sortType}`;

  return <Icon key={src} iconSVG={src} alt={alt} />
}

const MemoSortIcon = memo(SortIcon);
export default MemoSortIcon;