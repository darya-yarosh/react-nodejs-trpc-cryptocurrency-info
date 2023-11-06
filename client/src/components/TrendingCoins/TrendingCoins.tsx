import { memo } from "react";

import Coin from "models/Coin";

import Icon from "components/general/Icon/Icon";

import styles from "components/TrendingCoins/TrendingCoins.module.scss";

interface TrendingCoinsProps {
  coinList: Coin[];
}

function TrendingCoins({ coinList }: TrendingCoinsProps) {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Trending coins</h1>
      <section className={styles.coinList}>
        {coinList.map((coin) => {
          return (
            <div key={coin.id} className={styles.coin}>
              <p className={styles.coin__info}>{coin.rank}</p>
              <p className={styles.coin__info}>{coin.symbol}</p>
              <div className={styles.coin__info}>
                <Icon
                  iconSVG={`${coin.logo}`}
                  alt={`${coin.id} icon`}
                  sizePX={25}
                />
              </div>
              <p className={styles.coin__info}>{coin.name}</p>
              <p className={styles.coin__info}>{coin.priceUsd}</p>
            </div>
          );
        })}
      </section>
    </div>
  );
}

const MemoTrendingCoins = memo(TrendingCoins);
export default MemoTrendingCoins;