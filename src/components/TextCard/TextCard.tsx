import Coin, { CoinLabels } from "models/Coin";

import Button from "components/general/Button/Button";
import IconButton from "components/general/IconButton/IconButton";
import FavoriteButton from "components/FavoriteButton/FavoriteButton";

import styles from "components/TextCard/TextCard.module.scss";

interface TextCardProps {
    coin: Coin,
    closePage: () => void,
}

export default function TextCard({
    coin,
    closePage
}: TextCardProps) {
    return <section className={styles.wrapper}>
        <header className={styles.header}>
            <span>
                <IconButton
                    iconSVG="/images/buttons/return.svg"
                    caption={`Button for return to coins table page`}
                    onClick={closePage}
                />
                <img
                    src={`/${coin.logo}`}
                    alt={`${coin.id} icon`}
                    width={"25px"}
                ></img>
                <p className={styles.name}>{coin.name}</p>
                <p className={styles.symbol}>{coin.symbol}</p>
            </span>
            <FavoriteButton coinId={coin.id} />
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
        <footer className={styles.footer}>
            <Button label="Add to Portfolio" onClick={() => { }} />
        </footer>
    </section>
}