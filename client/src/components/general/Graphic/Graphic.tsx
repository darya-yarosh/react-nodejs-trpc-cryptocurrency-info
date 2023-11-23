import { useEffect, useRef, memo } from 'react';
import Chart, { ChartData } from 'chart.js/auto';

import styles from 'components/general/Graphic/Graphic.module.scss';

interface GraphicProps {
	title: string
	chartData: number[];
	labels: string[];
}

function Graphic({ title, chartData, labels }: GraphicProps) {
	const formatData = (data: number[]): ChartData => ({
		labels: labels,
		datasets: [
			{
				label: title,
				data: data,
			},
		],
	});

	const chartRef = useRef<Chart | null>(null);

	const canvasCallback = (canvas: HTMLCanvasElement | null) => {
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (ctx) {
			chartRef.current = new Chart(ctx, {
				type: 'line',
				data: formatData(chartData),
				options: { responsive: true },
			});
		}
	};

	let chartStatus = Chart.getChart('graphicChart');
	if (chartStatus !== undefined) {
		chartStatus.destroy();
	}

	useEffect(() => {
		if (chartRef.current) {
			chartRef.current.data = formatData(chartData);
			chartRef.current.update();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chartData]);

	return (
		<div className={styles.wrapper}>
			<canvas
				data-testid={'graphic'}
				ref={canvasCallback}
				id={'graphicChart'}
				className={styles.graphic}
			/>
		</div>
	);
}

const PureGraphic = memo(Graphic);

export default PureGraphic;
