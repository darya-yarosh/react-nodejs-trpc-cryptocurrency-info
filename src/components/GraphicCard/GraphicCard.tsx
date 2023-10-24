import { useState, useEffect } from "react";

import { CoinHistory, GraphicPeriod } from "models/Coin";

import Graphic from "components/general/Graphic/Graphic";
import Select from "components/general/Select/Select";

import { priceToNumber } from "logic/utils/Helper";

import styles from "components/GraphicCard/GraphicCard.module.scss";

interface GraphicCardProps {
  coinId: string;
  coinHistory: CoinHistory[];
  reloadCoinHistory: (
    coinId: string,
    graphicPeriod: GraphicPeriod
  ) => void;
}

export default function GraphicCard({
  coinId,
  coinHistory,
  reloadCoinHistory,
}: GraphicCardProps) {
  const [graphicPeriod, setGraphicPeriod] = useState<GraphicPeriod>(
    GraphicPeriod.d1,
  );

  function updateGraphicPeriod(newPeriod: string) {
    switch (newPeriod) {
      case GraphicPeriod.m1: {
        setGraphicPeriod(GraphicPeriod.m1);
        break;
      }
      case GraphicPeriod.w1: {
        setGraphicPeriod(GraphicPeriod.w1);
        break;
      }
      case GraphicPeriod.d1: {
        setGraphicPeriod(GraphicPeriod.d1);
        break;
      }
      default: {
        setGraphicPeriod((currentValue) => currentValue);
      }
    }
  }

  const graphicPeriodSelect: GraphicPeriod[] = [
    GraphicPeriod.d1,
    GraphicPeriod.w1,
    GraphicPeriod.m1,
  ];

  const chartData = coinHistory.map((value: CoinHistory) => {
    const unformattedPrice = priceToNumber(value.priceUsd);
    return unformattedPrice;
  });

  const labels = coinHistory.map((value: CoinHistory) => {
    function formatTimeValue(value: number) {
      return value < 10 ? `0${value}` : `${value}`;
    }

    const date = new Date(value.time);

    const formattedDay = formatTimeValue(date.getDay());
    const formattedMonth = formatTimeValue(date.getMonth() + 1);
    const formattedDate = `${formattedDay}.${formattedMonth}`;

    const formattedMinutes = formatTimeValue(date.getMinutes());
    const formattedHours = formatTimeValue(date.getHours());
    const formattedTime = `${formattedHours}:${formattedMinutes}`;

    return `${formattedDate}, ${formattedTime}`;
  });

  useEffect(() => {
    reloadCoinHistory(coinId, graphicPeriod)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphicPeriod]);

  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <Select
          label="Period per"
          name="period"
          options={graphicPeriodSelect}
          selectedOption={graphicPeriod}
          onChange={updateGraphicPeriod}
        />
      </header>
      <Graphic chartData={chartData} labels={labels} />
    </section>
  );
}
