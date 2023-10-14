import { useNavigate } from "react-router-dom";

import Coin from "models/Coin";

import FavoriteButton from "components/FavoriteButton/FavoriteButton";

import { percentToNumber } from "logic/utils/Helper";

import styles from "components/CoinTable/CoinNote/CoinNote.module.scss";

interface CoinNoteProps {
  coin: Coin;
}

export default function CoinNote({ coin }: CoinNoteProps) {
  const navigate = useNavigate();

  function navigateToCoin() {
    navigate(`/cryptocoins/${coin.id}`)
  }

  const changePercent24HrClassName =
    percentToNumber(coin.changePercent24Hr) < 0
      ? styles.negativeText
      : styles.positiveText;

  return (
    <tr className={styles.wrapper} onClick={navigateToCoin}>
      <td>
        <p>{coin.rank}</p>
      </td>
      <td>
        <p>{coin.symbol}</p>
      </td>
      <td>
        <img
          src={`${coin.logo}`}
          alt={`${coin.id} icon`}
          width={"25px"}
        ></img>
      </td>
      <td>
        <p>{coin.name}</p>
      </td>
      <td>
        <p>{coin.priceUsd}</p>
      </td>
      <td>
        <p>{coin.marketCapUsd}</p>
      </td>
      <td className={changePercent24HrClassName}>
        <p>{coin.changePercent24Hr}</p>
      </td>
      <td>
        <FavoriteButton coinId={coin.id} />
      </td>
    </tr>
  );
}
