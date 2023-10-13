import { useState, useEffect } from "react";

import { CoinHistory } from "models/Coin";

import Graphic from "components/Graphic/Graphic";
import Select from "components/general/Select/Select";

import { unformatPrice } from "logic/utils/Helper";
import coinCapController from "logic/storage/CoinCapController";

import styles from "components/GraphicCard/GraphicCard.module.scss";

enum GraphicPeriod {
    d1 = "d1",
    w1 = "w1",
    m1 = "m1"
}

interface GraphicCardProps {
    coinId: string
}

export default function GraphicCard({
    coinId
}: GraphicCardProps) {
    const [graphicPeriod, setGraphicPeriod] = useState<GraphicPeriod>(GraphicPeriod.d1);

    const [coinHistory, setCoinHistory] = useState<CoinHistory[]>([]);

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
                setGraphicPeriod(currentValue => currentValue);
            }
        }
    }

    function getDateDayAgo(startDate: Date) {
        const endDate = startDate;
        endDate.setDate(startDate.getDate() - 1)
        return endDate;
    }

    function getDateWeekAgo(startDate: Date) {
        const endDate = startDate;
        endDate.setDate(startDate.getDay() - 7)
        return endDate;
    }

    function getDateMonthAgo(startDate: Date) {
        const endDate = startDate;
        endDate.setMonth(startDate.getMonth() - 1)
        return endDate;
    }

    async function loadCoinHistory(coinId: string, graphicPeriod: GraphicPeriod) {
        const graphicInterval = graphicPeriod === GraphicPeriod.m1 ? "d1"
            : graphicPeriod === GraphicPeriod.w1 ? "h12"
                : graphicPeriod === GraphicPeriod.d1 ? "m30"
                    : "m30"

        const [startDate, endDate] = graphicPeriod === GraphicPeriod.m1
            ? [getDateMonthAgo(new Date()), new Date()]
            : graphicPeriod === GraphicPeriod.w1
                ? [getDateWeekAgo(new Date()), new Date()]
                : graphicPeriod === GraphicPeriod.d1
                    ? [getDateDayAgo(new Date()), new Date()]
                    : [getDateDayAgo(new Date()), new Date()]

        const data = await coinCapController.getCoinHistory(coinId, graphicInterval, endDate, startDate);
        setCoinHistory(data);
    }

    const graphicPeriodSelect: GraphicPeriod[] = [
        GraphicPeriod.d1,
        GraphicPeriod.w1,
        GraphicPeriod.m1
    ];

    const c = coinHistory.map((value: CoinHistory) => {
        const unformattedPrice = unformatPrice(value.priceUsd);
        return unformattedPrice;
    })

    const l = coinHistory.map((value: CoinHistory) => {
        function formatTimeValue(value: number) {
            return value < 10
                ? `0${value}`
                : `${value}`;
        }

        const date = new Date(value.time);

        const formattedDay = formatTimeValue(date.getDay());
        const formattedMonth = formatTimeValue(date.getMonth() + 1);
        const formattedDate = `${formattedDay}.${formattedMonth}`;

        const formattedMinutes = formatTimeValue(date.getMinutes());
        const formattedHours = formatTimeValue(date.getHours());
        const formattedTime = `${formattedHours}:${formattedMinutes}`

        return `${formattedDate}, ${formattedTime}`;
    })

    useEffect(() => {
        loadCoinHistory(coinId, graphicPeriod)
    }, [graphicPeriod]);

    return <section className={styles.wrapper}>
        <header className={styles.header}>
            <span>Period per </span>
            <Select
                selectList={graphicPeriodSelect}
                selectedOption={graphicPeriod}
                onChange={updateGraphicPeriod} />
        </header>
        <Graphic chartData={c} labels={l} />
    </section>
}