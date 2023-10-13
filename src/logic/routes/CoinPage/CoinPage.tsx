import { useLoaderData, useNavigate } from "react-router-dom";

import Coin from "models/Coin";

import TextCard from "components/TextCard/TextCard";
import GraphicCard from "components/GraphicCard/GraphicCard";

import styles from "logic/routes/CoinPage/CoinPage.module.scss";

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
