import { useEffect, useRef, memo } from "react";
import Chart, { ChartData } from "chart.js/auto";

import styles from "components/Graphic/Graphic.module.scss";

interface GraphicProps {
  chartData: number[];
  labels: string[];
}

function Graphic({ chartData, labels }: GraphicProps) {
  const formatData = (data: number[]): ChartData => ({
    labels: labels,
    datasets: [{
      label: "Price",
      data: data
    }],
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

  let chartStatus = Chart.getChart("graphicChart");
  if (chartStatus !== undefined) {
    chartStatus.destroy();
  }

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.data = formatData(chartData);
      chartRef.current.update();
    }
  }, [chartData]);

  return (
    <div className={styles.wrapper}>
      <canvas
        ref={canvasCallback}
        id={"graphicChart"}
        className={styles.graphic} />
    </div>
  );
}

const PureGraphic = memo(Graphic);

export default PureGraphic;