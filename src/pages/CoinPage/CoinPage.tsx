import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Coin from "models/Coin";

import TextCard from "components/TextCard/TextCard";
import GraphicCard from "components/GraphicCard/GraphicCard";

import coinCapController from "logic/storage/CoinCapController";

import styles from "pages/CoinPage/CoinPage.module.scss";

export default function CoinPage() {
  const navigate = useNavigate();
  const params = useParams();

  const [coin, setCoin] = useState<Coin>();
  useEffect(() => {
    async function loadCoin(coinId: Coin['id']) {
      await coinCapController.getCoinById(coinId).then(loadedCoin => setCoin(loadedCoin));
    }
    if (params.id !== undefined) {
      loadCoin(params.id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!coin) return null;

  return (
    <div className={styles.wrapper}>
      <TextCard coin={coin} closePage={() => navigate(-1)} />
      <GraphicCard coinId={coin.id} />
    </div>
  );
}
