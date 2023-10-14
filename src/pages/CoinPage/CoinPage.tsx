import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Context as CoinsContext } from "providers/coins";

import Coin from "models/Coin";

import TextCard from "components/TextCard/TextCard";
import GraphicCard from "components/GraphicCard/GraphicCard";

import styles from "pages/CoinPage/CoinPage.module.scss";

export default function CoinPage() {
  const navigate = useNavigate();
  const params = useParams();

  const { data: coins } = useContext(CoinsContext);
  const coin: Coin | undefined = coins.find((c) => c.id === params.id);

  if (!coin) return null;

  return (
    <div className={styles.wrapper}>
      <TextCard coin={coin} closePage={() => navigate(-1)} />
      <GraphicCard coinId={coin.id} />
    </div>
  );
}
