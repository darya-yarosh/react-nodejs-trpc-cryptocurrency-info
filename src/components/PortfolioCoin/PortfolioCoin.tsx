import { useContext, useMemo } from "react";

import Coin from "models/Coin";

import { Diff } from "components/Diff/Diff";
import BuyCoinButton from "components/BuyCoinButton/BuyCoinButton";
import RemoveCoinButton from "components/RemoveCoinButton/RemoveCoinButton";

import { CoinSummary } from "logic/utils/PortfolioHelper";
import { priceToNumber, formatPrice } from "logic/utils/Helper";

import { Context as CoinsContext } from "providers/coins";

import styles from "components/PortfolioCoin/PortfolioCoin.module.scss";

interface PortfolioCoinProps {
  summary: CoinSummary;
  removeCoin: (coinId: Coin['id']) => void;
}

export default function PortfolioCoin({
  summary,
  removeCoin,
}: PortfolioCoinProps) {
  const coinsContext = useContext(CoinsContext);

  const coin = coinsContext.data.find((c) => c.id === summary.id);

  const logoUrl = useMemo(() => {
    return coin?.logo;
  }, [coin?.logo]);

  if (!coin) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <img src={logoUrl} alt={`${summary.id} icon`} width={"25px"} />
        <span className={styles.coinName}>{coin.name}</span>
        <span className={styles.label}>Amount:</span>
        <span>{summary.amount}</span>
      </div>
      <div className={styles.price}>
        <span className={styles.label}>Price:</span>
        <span>{formatPrice(summary.moneySpent)}</span>
        <Diff
          original={summary.moneySpent}
          actual={summary.amount * priceToNumber(coin.priceUsd)}
        />
        <BuyCoinButton 
          className={styles.buyButton}
          coinId={coin.id} />
        <RemoveCoinButton 
          className={styles.removeButton}
          label="Remove"
          coinId={coin.id}
          confirmMessage={`You want to remove all transaction of coin ${coin?.id}. Are you sure?`}
          onClick={removeCoin}        />
      </div>
    </div>
  );
}
