import { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import Coin from "models/Coin";

import Diff from "components/Diff/Diff";

import { getSpentAmount } from "logic/utils/PortfolioHelper";
import { formatPrice } from "logic/utils/Helper";

import { Context as PortfolioContext } from "providers/portfolio";

import styles from "components/PortfolioLiteCard/PortfolioLiteCard.module.scss";

interface PortfolioLiteCardProps {
  coins: Coin[];
  actualPrice: number;
}

export default function PortfolioLiteCard({
  coins,
  actualPrice,
}: PortfolioLiteCardProps) {
  const navigate = useNavigate();
  const portfolio = useContext(PortfolioContext).data;

  const spentAmount = useMemo(() => getSpentAmount(portfolio), [portfolio]);

  function handleNavigateToPortfolioClick(event: React.MouseEvent) {
    if (!event.isDefaultPrevented()) {
      navigate(`portfolio`);
    }
  }

  return (
    <section className={styles.wrapper}
      onClick={handleNavigateToPortfolioClick}>
      <label className={styles.label}>My Portfolio</label>
      <div className={styles.values}>
        <span className={styles.spentAmount}>{formatPrice(spentAmount)}</span>
        <Diff
          className={styles.diff}
          original={spentAmount}
          actual={actualPrice}
        />
      </div>
    </section>
  );
}
