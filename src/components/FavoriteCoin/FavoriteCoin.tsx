import { useEffect, useState } from "react";

import Coin from "models/Coin";

import Icon from "components/general/Icon/Icon";
import BuyCoinButton from "components/BuyCoinButton/BuyCoinButton";
import FavoriteButton from "components/FavoriteButton/FavoriteButton";

import coinCapController from 'logic/storage/CoinCapController';
import { formatPrice, priceToNumber } from "logic/utils/Helper";

import styles from "components/FavoriteCoin/FavoriteCoin.module.scss";

interface FavoriteCoinProps {
  id: Coin["id"];
}

export default function FavoriteCoin({
  id
}: FavoriteCoinProps) {
  const [coin, setCoin] = useState<Coin>();

  useEffect(()=>{
    async function loadCoin(coinId: Coin['id']) {
      await coinCapController.getCoinById(coinId).then(loadedCoin=>setCoin(loadedCoin));
    }

    loadCoin(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!coin) return null;

  return (
    <div className={styles.wrapper}>
      <Icon iconSVG={coin.logo} alt={`${coin.id} icon`} sizePX={25}/>
      <span>{coin.name}</span>
      <span>{coin.symbol}</span>
      <span>{formatPrice(priceToNumber(coin.priceUsd))}</span>
      <BuyCoinButton className={styles.buyButton} coinId={coin.id} />
      <FavoriteButton coinId={coin.id} />
    </div>
  );
}
