import { memo } from 'react';

import { formatPercent, formatPrice } from 'logic/utils/Helper';

import styles from 'components/Diff/Diff.module.scss';

interface DiffProps {
	className?: string;
	original: number;
	actual: number;
}

function Diff({
	className = '',
	original = 0,
	actual = 0,
}: React.PropsWithChildren<DiffProps>) {
	const difference = -(original - actual);
	const positive = difference >= 0;

	const percent =
		actual === 0 && original === 0
			? '0.00%'
			: formatPercent(((actual * 100) / original - 100).toString());

	const classNames = [
		positive ? styles.diffPositive : styles.diffNegative,
		className,
	].join(' ');

	return (
		<p className={classNames}>
			<span>
				{positive ? '+' : '-'}
				{formatPrice(Math.abs(difference).toString())}
			</span>
			<span>
				({positive ? '+' : ''}
				{percent})
			</span>
		</p>
	);
}

const MemoDiff = memo(Diff);
export default MemoDiff;
