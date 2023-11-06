import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import Coin from 'models/Coin';

import Icon from 'components/general/Icon/Icon';
import FavoriteButton from 'components/FavoriteButton/FavoriteButton';

import { percentToNumber } from 'logic/utils/Helper';

import styles from 'components/CoinTable/CoinNote/CoinNote.module.scss';

interface CoinNoteProps {
	coin: Coin;
}

function CoinNote({ coin }: CoinNoteProps) {
	const changePercent24HrClassName =
		percentToNumber(coin.changePercent24Hr) < 0
			? styles.negativeText
			: styles.positiveText;

	const navigate = useNavigate();

	function handleNavigateToCoinClick(event: React.MouseEvent) {
		if (!event.isDefaultPrevented()) {
			navigate(`/cryptocoins/${coin.id}`);
		}
	}

	return (
		<tr className={styles.wrapper} onClick={handleNavigateToCoinClick}>
			<td>
				<p>{coin.rank}</p>
			</td>
			<td>
				<p>{coin.symbol}</p>
			</td>
			<td>
				<Icon iconSVG={coin.logo} alt={`${coin.id} icon`} sizePX={25} />
			</td>
			<td>
				<p>{coin.name}</p>
			</td>
			<td>
				<p>{coin.priceUsd}</p>
			</td>
			<td>
				<p>{coin.marketCapUsd}</p>
			</td>
			<td className={changePercent24HrClassName}>
				<p>{coin.changePercent24Hr}</p>
			</td>
			<td>
				<FavoriteButton key={coin.id} coinId={coin.id} />
			</td>
		</tr>
	);
}

const MemoCoinNote = memo(CoinNote);
export default MemoCoinNote;
