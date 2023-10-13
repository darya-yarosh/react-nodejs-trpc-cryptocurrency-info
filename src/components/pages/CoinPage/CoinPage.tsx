import { useLoaderData, useNavigate } from "react-router-dom";

import Coin from "models/Coin";

import TextCard from "components/pages/CoinPage/TextCard/TextCard";
import GraphicCard from "components/pages/CoinPage/GraphicCard/GraphicCard";

import styles from "components/pages/CoinPage/CoinPage.module.scss";

export default function CoinPage() {
  const coin: Coin = useLoaderData() as Coin;
  const navigate = useNavigate();
  
  return (
    <div className={styles.wrapper}>
      <TextCard coin={coin} closePage={()=>navigate(-1)}/>
      <GraphicCard coinId={coin.id} />
    </div>
  );
}
