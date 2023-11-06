import { memo, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { CoinHistory, GraphicPeriod } from "models/Coin";

import TextCard from "components/TextCard/TextCard";
import GraphicCard from "components/GraphicCard/GraphicCard";

import {
  getDateDayAgo,
  getDateMonthAgo,
  getDateWeekAgo
} from "logic/utils/Helper";

import styles from "pages/CoinPage/CoinPage.module.scss";
import { createTRPCReact } from "@trpc/react-query";

import { AppRouter } from "../../../../server/src/appRouter"

const trpc = createTRPCReact<AppRouter>();

function CoinPage() {
  const navigate = useNavigate();
  const params = useParams();

  const coinData = trpc.getCoinById.useQuery(params.id || '');
  const coin = coinData.data;

  const [graphicPeriod, setGraphicPeriod] = useState<GraphicPeriod>(GraphicPeriod.d1);
  const graphicInterval = useMemo(() =>
    graphicPeriod === GraphicPeriod.m1
      ? "d1"
      : graphicPeriod === GraphicPeriod.w1
        ? "h12"
        : graphicPeriod === GraphicPeriod.d1
          ? "m30"
          : "m30"
    , [graphicPeriod]);
  const [startDate, endDate] = useMemo(() =>
    graphicPeriod === GraphicPeriod.m1
      ? [getDateMonthAgo(new Date()), new Date()]
      : graphicPeriod === GraphicPeriod.w1
        ? [getDateWeekAgo(new Date()), new Date()]
        : graphicPeriod === GraphicPeriod.d1
          ? [getDateDayAgo(new Date()), new Date()]
          : [getDateDayAgo(new Date()), new Date()]
    , [graphicPeriod]);

  const coinHistoryData = trpc.getCoinHistory.useQuery({
    id: params.id || coin?.id || '',
    interval: graphicInterval,
    end: endDate,
    start: startDate
  });
  const coinHistory = coinHistoryData.data as unknown as CoinHistory[];

  function updateGraphicPeriod(newValue: GraphicPeriod) {
    setGraphicPeriod(newValue);
  }

  function navigateBack() {
    navigate(-1);
  }

  if (!coin) return <div>Loading...</div>;

  return (
    <div className={styles.wrapper}>
      <TextCard
        coin={coin}
        closePage={navigateBack}
      />
      {!coinHistory && <div>Loading...</div>}
      {coinHistory && <GraphicCard
        coinHistory={coinHistory}
        graphicPeriod={graphicPeriod}
        updateGraphicPeriod={updateGraphicPeriod}
      />}
    </div>
  );
}

const MemoCoinPage = memo(CoinPage);
export default MemoCoinPage;