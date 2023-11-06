import { memo, useState } from 'react';

import styles from 'components/general/Icon/Icon.module.scss';

interface IconProps {
	iconSVG: string;
	sizePX?: number;
	alt: string;
}

function Icon({ iconSVG, sizePX = 25, alt }: IconProps) {
	const [logoSrc, setLogoSrc] = useState<string>(iconSVG);

	const wrapperSize = `${sizePX + 8}px`;
	const iconSize = `${sizePX}px`;

	function setDefaultLogoSrc() {
		setLogoSrc('/images/imgNotFound.svg');
	}

	return (
		<div
			className={styles.wrapper}
			style={{
				width: wrapperSize,
				height: wrapperSize,
			}}
		>
			<img
				className={styles.icon}
				onError={setDefaultLogoSrc}
				src={logoSrc}
				alt={alt}
				style={{ width: iconSize, height: iconSize }}
			/>
		</div>
	);
}

const MemoIcon = memo(Icon);
export default MemoIcon;
