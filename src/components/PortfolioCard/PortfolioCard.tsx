import { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";

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

export default function PortfolioCard() {
  const navigate = useNavigate();

  const coins = useContext(CoinsContext).data;
  const portfolio = useContext(PortfolioContext).data;

  function navigateBack() {
    navigate(-1);
  }

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
          <label>Total price</label>
          <span>{formatPrice(spentAmount)}</span>
          <Diff
            className={styles.diff}
            original={spentAmount}
            actual={actualPrice}
          />
        </section>
        <section className={styles.perCoinList}>
          <label>Details by coin</label>
          {coinsSummary.map((coin) => (
            <PortfolioCoin key={coin.id} summary={coin} />
          ))}
        </section>
        <section className={styles.favoritesList}>
          <label>Favorites</label>
          {portfolio.favorites.map((favorite) => (
            <FavoriteCoin key={favorite} id={favorite} />
          ))}
        </section>
      </div>
    </div>
  );
}
