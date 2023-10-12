import Coin from "models/Coin";

import IconButton from "components/general/IconButton/IconButton";

import styles from "components/CoinNote/CoinNote.module.scss";

interface CoinNoteProps {
  coin: Coin;
}

export default function CoinNote({ coin }: CoinNoteProps) {
  return (
    <tr key={coin.id} className={styles.note__wrapper}>
      <td>
        <p>{coin.rank}</p>
      </td>
      <td>
        <p>{coin.symbol}</p>
      </td>
      <td>
        <img src={`${coin.logo}`} alt={`${coin.id} icon`} width={"25px"}></img>
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
      <td>
        <p>{coin.changePercent24Hr}</p>
      </td>
      <td>
        <IconButton
          caption={`Button to adding ${coin.name} in portfolio`}
          iconSVG={"/images/buttons/plus.svg"}
          onClick={() => {}}
        />
      </td>
    </tr>
  );
}
