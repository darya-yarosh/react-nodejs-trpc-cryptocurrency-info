import { useContext } from "react";

import Coin from "models/Coin"

import IconButton from "components/general/IconButton/IconButton";

import { Context as PortfolioContext } from "providers/portfolio";

type FavoriteButtonProps = {
    coinId: Coin['id'];
}

export default function FavoriteButton({
    coinId,
}: FavoriteButtonProps) {
    const {
        data: portfolio,
        addFavorite,
        removeFavorite,
    } = useContext(PortfolioContext);

    const isFavorite = portfolio.favorites.includes(coinId);

    function handleClick(event: React.MouseEvent) {
        event.preventDefault();

        if (isFavorite) {
            removeFavorite(coinId);
        } else {
            addFavorite(coinId);
        }
    }

    return (
        <IconButton
            caption={`Button to adding ${coinId} in portfolio`}
            iconSVG={isFavorite
                ? "/images/favorite/favorite-fill.svg"
                : "/images/favorite/favorite-unfill.svg"}
            onClick={handleClick}
        />
    )
}