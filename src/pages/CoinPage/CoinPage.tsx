import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Coin, { CoinHistory, GraphicPeriod } from "models/Coin";

import TextCard from "components/TextCard/TextCard";
import GraphicCard from "components/GraphicCard/GraphicCard";

import {
  getDateDayAgo,
  getDateMonthAgo,
  getDateWeekAgo
} from "logic/utils/Helper";
import coinCapController from "logic/storage/CoinCapController";

import styles from "pages/CoinPage/CoinPage.module.scss";

export default function CoinPage() {
  const navigate = useNavigate();
  const params = useParams();

  const [coin, setCoin] = useState<Coin>();
  const [coinHistory, setCoinHistory] = useState<CoinHistory[]>([]);

  function navigateBack() {
    navigate(-1);
  }

  async function loadCoinHistory(
    coinId: string,
    graphicPeriod: GraphicPeriod
  ) {
    const graphicInterval =
      graphicPeriod === GraphicPeriod.m1
        ? "d1"
        : graphicPeriod === GraphicPeriod.w1
          ? "h12"
          : graphicPeriod === GraphicPeriod.d1
            ? "m30"
            : "m30";

    const [startDate, endDate] =
      graphicPeriod === GraphicPeriod.m1
        ? [getDateMonthAgo(new Date()), new Date()]
        : graphicPeriod === GraphicPeriod.w1
          ? [getDateWeekAgo(new Date()), new Date()]
          : graphicPeriod === GraphicPeriod.d1
            ? [getDateDayAgo(new Date()), new Date()]
            : [getDateDayAgo(new Date()), new Date()];

    const data = await coinCapController.getCoinHistory(
      coinId,
      graphicInterval,
      endDate,
      startDate,
    );
    setCoinHistory(data);
  }

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
      <TextCard
        coin={coin}
        closePage={navigateBack}
      />
      <GraphicCard
        coinId={coin.id}
        coinHistory={coinHistory}
        reloadCoinHistory={loadCoinHistory}
      />
    </div>
  );
}

