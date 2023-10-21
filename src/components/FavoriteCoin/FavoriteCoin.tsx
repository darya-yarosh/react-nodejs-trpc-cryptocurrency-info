import { useContext } from "react";

import Coin from "models/Coin";

import BuyCoinButton from "components/BuyCoinButton/BuyCoinButton";
import FavoriteButton from "components/FavoriteButton/FavoriteButton";

import { formatPrice, priceToNumber } from "logic/utils/Helper";

import { Context as CoinsContext } from "providers/coins";

import styles from "components/FavoriteCoin/FavoriteCoin.module.scss";

interface FavoriteCoinProps {
  id: Coin["id"];
}

export default function FavoriteCoin({
  id
}: FavoriteCoinProps) {
  const coins = useContext(CoinsContext).data;

  const coin = coins.find((c) => c.id === id);

  if (!coin) return null;

  return (
    <div className={styles.wrapper}>
      <img src={coin.logo}
        alt={`${coin.id} icon`}
        width={"25px"}
      />
      <span>{coin.name}</span>
      <span>{coin.symbol}</span>
      <span>{formatPrice(priceToNumber(coin.priceUsd))}</span>
      <BuyCoinButton className={styles.buyButton} coinId={coin.id} />
      <FavoriteButton coinId={coin.id} />
    </div>
  );
}
