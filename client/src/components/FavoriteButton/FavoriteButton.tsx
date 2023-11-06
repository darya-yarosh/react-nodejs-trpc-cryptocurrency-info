import { useContext, useMemo } from 'react';

import Coin from 'models/Coin';

import IconButton from 'components/general/IconButton/IconButton';

import { Context as PortfolioContext } from 'providers/portfolio';

interface FavoriteButtonProps {
	coinId: Coin['id'];
	disabled?: boolean;
}

export default function FavoriteButton({
	coinId,
	disabled = false,
}: FavoriteButtonProps) {
	const {
		data: portfolio,
		addFavorite,
		removeFavorite,
	} = useContext(PortfolioContext);

	const isFavorite = portfolio.favorites.includes(coinId);

	const handleClick = useMemo(
		() => (event: React.MouseEvent) => {
			event.preventDefault();
			if (isFavorite) {
				removeFavorite(coinId);
			} else {
				addFavorite(coinId);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[isFavorite]
	);

	const iconSVG = useMemo(
		() =>
			isFavorite
				? '/images/favorite/favorite-fill.svg'
				: '/images/favorite/favorite-unfill.svg',
		[isFavorite]
	);

	return (
		<IconButton
			key={coinId}
			caption={`Button to adding ${coinId} in portfolio`}
			iconSVG={iconSVG}
			sizePX={25}
			onClick={handleClick}
			disabled={disabled}
		/>
	);
}
