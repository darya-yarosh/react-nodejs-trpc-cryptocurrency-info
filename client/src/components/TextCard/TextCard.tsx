import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import Coin, { CoinLabels } from 'models/Coin';

import Icon from 'components/general/Icon/Icon';
import Button from 'components/general/Button/Button';
import IconButton from 'components/general/IconButton/IconButton';
import FavoriteButton from 'components/FavoriteButton/FavoriteButton';

import styles from 'components/TextCard/TextCard.module.scss';

interface TextCardProps {
	coin: Coin;
	closePage: () => void;
}

function TextCard({ coin, closePage }: TextCardProps) {
	const navigate = useNavigate();

	function handleBuyClick() {
		navigate('/purchase/' + coin.id);
	}

	return (
		<section className={styles.wrapper}>
			<header className={styles.header}>
				<span>
					<IconButton
						iconSVG="/images/buttons/return.svg"
						caption={`Button for return to coins table page`}
						onClick={closePage}
					/>
					<Icon
						iconSVG={`/${coin.logo}`}
						alt={`${coin.id} icon`}
						sizePX={25}
					/>
					<p className={styles.name}>{coin.name}</p>
					<p className={styles.symbol}>{coin.symbol}</p>
				</span>
				<FavoriteButton coinId={coin.id} />
			</header>
			<div className={styles.infoTable}>
				<p className={styles.price}>{coin.priceUsd}</p>
				<p>
					<span>{CoinLabels.marketCap}:</span>{' '}
					<span>{coin.marketCapUsd}</span>
				</p>
				<p>
					<span>{CoinLabels.supply}:</span> <span>{coin.supply}</span>
				</p>
				<p>
					<span>{CoinLabels.maxSupply}:</span>{' '}
					<span>{coin.maxSupply}</span>
				</p>
				<p>
					<span>{CoinLabels.rank}:</span> <span>{coin.rank}</span>
				</p>
			</div>
			<footer className={styles.footer}>
				<Button label="Buy" onClick={handleBuyClick} />
			</footer>
		</section>
	);
}

const MemoTextCard = memo(TextCard);
export default MemoTextCard;
