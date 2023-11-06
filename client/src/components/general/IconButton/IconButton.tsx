import { memo } from 'react';

import styles from 'components/general/IconButton/IconButton.module.scss';

interface IconButtonProps {
	iconSVG: string;
	caption: string;
	onClick: (event: React.MouseEvent) => void;
	sizePX?: number;
	disabled?: boolean;
}

function IconButton({
	iconSVG,
	caption,
	onClick,
	sizePX = 25,
	disabled = false,
}: IconButtonProps) {
	const wrapperSize = `${sizePX + 8}px`;
	const iconSize = `${sizePX}px`;

	return (
		<button
			className={styles.wrapper}
			onClick={onClick}
			type="button"
			style={{ width: wrapperSize, height: wrapperSize }}
			disabled={disabled}
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

const MemoIconButton = memo(IconButton);
export default MemoIconButton;
