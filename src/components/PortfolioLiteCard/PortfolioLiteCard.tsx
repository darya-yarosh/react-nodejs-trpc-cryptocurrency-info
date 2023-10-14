import { useContext, useMemo } from "react";
import { Link } from "react-router-dom";

import { Diff } from "components/Diff/Diff";

import {
  getCoinsActualPrice,
  getSpentAmount,
  mapTransactionsByCoin,
} from "logic/utils/PortfolioHelper";
import { formatPrice } from "logic/utils/Helper";

import { Context as CoinsContext } from "providers/coins";
import { Context as PortfolioContext } from "providers/portfolio";

import styles from "components/PortfolioLiteCard/PortfolioLiteCard.module.scss";

export default function PortfolioLiteCard() {
  const portfolio = useContext(PortfolioContext).data;
  const coins = useContext(CoinsContext).data;

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
    <Link to={`portfolio`}>
      <section className={styles.wrapper}>
        <label className={styles.label}>My Portfolio</label>
        <span className={styles.spentAmount}>{formatPrice(spentAmount)}</span>
        <Diff
          className={styles.diff}
          original={spentAmount}
          actual={actualPrice}
        />
      </section>
    </Link>
  );
}
