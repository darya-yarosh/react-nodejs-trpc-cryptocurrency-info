import { useEffect, useMemo, useRef } from "react";
import Chart, { ChartData } from "chart.js/auto";

import { CoinHistoryIntervalList } from "logic/storage/CoinCapController";

import styles from "components/Graphic/Graphic.module.scss";

interface GraphicProps {
  chartData: number[];
  period: CoinHistoryIntervalList;
}

// TODO
export default function Graphic({ chartData, period }: GraphicProps) {
  const labelCount = 7; // TODO Calculate from period

  const labelList = useMemo(
    () => new Array(labelCount).fill(0).map((e, i) => Number(i + 1)),
    [period],
  );

  const formatData = (data: number[]): ChartData => ({
    labels: labelList,
    datasets: [{ data }],
  });

  const chartRef = useRef<Chart | null>(null);

  const canvasCallback = (canvas: HTMLCanvasElement | null) => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      chartRef.current = new Chart(ctx, {
        type: "line",
        data: formatData(chartData),
        options: { responsive: true },
      });
    }
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.data = formatData(chartData);
      chartRef.current.update();
    }
  }, [chartData]);

  return (
    <div className={styles.wrapper}>
      <canvas ref={canvasCallback}></canvas>
    </div>
  );
}
