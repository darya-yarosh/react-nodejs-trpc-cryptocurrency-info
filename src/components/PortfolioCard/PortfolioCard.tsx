import { useContext, useMemo } from "react";

import Coin from "models/Coin";

import { formatPrice } from "logic/utils/Helper";
import {
  getCoinsActualPrice,
  getSpentAmount,
  mapTransactionsByCoin,
} from "logic/utils/PortfolioHelper";

import { Context as CoinsContext } from "providers/coins";
import { Context as PortfolioContext } from "providers/portfolio";

import { Diff } from "components/Diff/Diff";
import IconButton from "components/general/IconButton/IconButton";
import FavoriteCoin from "components/FavoriteCoin/FavoriteCoin";
import PortfolioCoin from "components/PortfolioCoin/PortfolioCoin";

import styles from "components/PortfolioCard/PortfolioCard.module.scss";

interface PortfolioCardProps {
  isLoading: boolean;
  favoriteCoins: Coin[];
  navigateBack: () => void;
}

export default function PortfolioCard({
  isLoading,
  favoriteCoins,
  navigateBack
}: PortfolioCardProps) {
  const coins = useContext(CoinsContext).data;
  const portfolio = useContext(PortfolioContext).data;
  const { removeCoinTransactions } = useContext(PortfolioContext);

  const spentAmount = useMemo(() => getSpentAmount(portfolio), [portfolio]);

  const coinsSummary = useMemo(
    () => mapTransactionsByCoin(portfolio.transactionList),
    [portfolio.transactionList],
  );

  const actualPrice = useMemo(() => {
    const coinPrices = getCoinsActualPrice(coins || [], coinsSummary);

    return coinPrices.reduce((total, coin) => total + coin.price, 0);
  }, [coins, coinsSummary]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <IconButton
          iconSVG="images/buttons/return.svg"
          caption="Go back"
          onClick={navigateBack}
        />
        <h3>My portfolio</h3>
      </div>
      <div className={styles.content}>
        <section className={styles.priceSummary}>
          <label className={styles.priceSummary__label}>Total price</label>
          <span className={styles.price}>{formatPrice(spentAmount)}</span>
          <Diff
            className={styles.diff}
            original={spentAmount}
            actual={actualPrice}
          />
        </section>
        <section className={styles.perCoinList}>
          <label className={styles.perCoinList__label}>Details by coin</label>
          {coinsSummary.length === 0 && <span>Empty</span>}
          {coinsSummary.map((coin) => (
            <PortfolioCoin
              key={coin.id}
              summary={coin}
              removeCoin={removeCoinTransactions} />
          ))}
        </section>
        <section className={styles.favoritesList}>
          <label className={styles.favoritesList__label}>Favorites</label>
          {favoriteCoins.length === 0 && <span>Empty</span>}
          {favoriteCoins.map((favorite) => (
            <FavoriteCoin key={favorite.id} coin={favorite} isDisabledButton={isLoading} />
          ))}
        </section>
      </div>
    </div>
  );
}
