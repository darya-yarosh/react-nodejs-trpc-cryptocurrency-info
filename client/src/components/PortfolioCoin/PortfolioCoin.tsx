import { useMemo } from 'react';

import Coin from 'models/Coin';
import { CoinWithSummary } from 'models/Portfolio';

import Icon from 'components/general/Icon/Icon';
import Diff from 'components/Diff/Diff';
import BuyCoinButton from 'components/BuyCoinButton/BuyCoinButton';
import RemoveCoinButton from 'components/RemoveCoinButton/RemoveCoinButton';

import { priceToNumber, formatPrice } from 'logic/utils/Helper';

import styles from 'components/PortfolioCoin/PortfolioCoin.module.scss';

interface PortfolioCoinProps {
	coin: CoinWithSummary;
	removeCoin: (coinId: Coin['id']) => void;
}

export default function PortfolioCoin({
	coin,
	removeCoin,
}: PortfolioCoinProps) {
	const logoUrl = useMemo(() => {
		return coin?.logo || '';
	}, [coin?.logo]);

	if (!coin) return null;

	return (
		<div className={styles.wrapper}>
			<div className={styles.logo}>
				<Icon iconSVG={logoUrl} alt={`${coin.id} icon`} sizePX={25} />
				<span className={styles.coinName}>{coin.name}</span>
				<span className={styles.label}>Amount:</span>
				<span>{coin.amount}</span>
			</div>
			<div className={styles.price}>
				<span className={styles.label}>Price:</span>
				<span>{formatPrice(coin.moneySpent)}</span>
				<Diff
					original={coin.moneySpent}
					actual={coin.amount * priceToNumber(coin.priceUsd)}
				/>
			</div>
			<div className={styles.navigation}>
				<BuyCoinButton className={styles.buyButton} coinId={coin.id} />
				<RemoveCoinButton
					className={styles.removeButton}
					label="Remove"
					coinId={coin.id}
					confirmMessage={`You want to remove all transaction of coin ${coin?.id}. Are you sure?`}
					onClick={removeCoin}
				/>
			</div>
		</div>
	);
}
