import { useLoaderData } from "react-router-dom";

import Coin, { CoinLabels } from "models/Coin";

import Button from "components/general/Button/Button";
import IconButton from "components/general/IconButton/IconButton";
import Graphic from "components/Graphic/Graphic";

import styles from "components/pages/CoinPage/CoinPage.module.scss";

export default function CoinPage() {
  const coin: Coin = useLoaderData() as Coin;

  // TODO : isInPortfolio
  const favoriteSrc = false
    ? "/images/favorite/favorite-fill.svg"
    : "/images/favorite/favorite-unfill.svg";

  return (
    <div className={styles.wrapper}>
      <section className={styles.textInfo}>
        <header className={styles.textInfo__header}>
          <span>
            <IconButton
              iconSVG="/images/buttons/return.svg"
              caption={`Button for return to coins table page`}
              onClick={() => {}}
            />
            <img
              src={`/${coin.logo}`}
              alt={`${coin.id} icon`}
              width={"25px"}
            ></img>
            <p className={styles.name}>{coin.name}</p>
            <p className={styles.symbol}>{coin.symbol}</p>
          </span>
          <IconButton
            iconSVG={favoriteSrc}
            caption={`Button for adding ${coin.name} to user portfolio.`}
            onClick={() => {}}
          />
        </header>
        <div className={styles.infoTable}>
          <p className={styles.price}>{coin.priceUsd}</p>
          <p>
            <span>{CoinLabels.marketCap}:</span>{" "}
            <span>{coin.marketCapUsd}</span>
          </p>
          <p>
            <span>{CoinLabels.supply}:</span> <span>{coin.supply}</span>
          </p>
          <p>
            <span>{CoinLabels.maxSupply}:</span> <span>{coin.maxSupply}</span>
          </p>
          <p>
            <span>{CoinLabels.rank}:</span> <span>{coin.rank}</span>
          </p>
        </div>
        <footer className={styles.textInfo__footer}>
          <Button label="Add to Portfolio" onClick={() => {}} />
        </footer>
      </section>
      <section className={styles.graphicInfo}>
        <header></header>
        <div className={styles.graphicWrapper}>
          <Graphic chartData={[]} period={"d1"} />
        </div>
      </section>
    </div>
  );
}
