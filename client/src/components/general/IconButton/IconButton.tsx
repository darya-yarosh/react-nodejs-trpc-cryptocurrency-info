import { memo, useEffect, useState } from 'react';

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
	const [logoSrc, setLogoSrc] = useState<string>(iconSVG);

	const wrapperSize = `${sizePX + 8}px`;
	const iconSize = `${sizePX}px`;

	function setDefaultLogoSrc() {
		setLogoSrc('/images/imgNotFound.svg');
	}

	useEffect(() => {
		setLogoSrc(iconSVG)
	}, [iconSVG])

	return (
		<button
			data-testid={'iconButton-button'}
			className={styles.wrapper}
			onClick={onClick}
			type="button"
			style={{ width: wrapperSize, height: wrapperSize }}
			disabled={disabled}
		>
			<img
				data-testid={'iconButton-icon'}
				className={styles.icon}
				src={logoSrc}
				onError={setDefaultLogoSrc}
				alt={caption}
				style={{ width: iconSize, height: iconSize }}
			/>
		</button>
	);
}

const MemoIconButton = memo(IconButton);
export default MemoIconButton;