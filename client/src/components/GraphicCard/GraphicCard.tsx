import { memo } from 'react';

import { CoinHistory, GraphicPeriod } from 'models/Coin';

import Graphic from 'components/general/Graphic/Graphic';
import Select from 'components/general/Select/Select';

import { priceToNumber } from 'logic/utils/Helper';

import styles from 'components/GraphicCard/GraphicCard.module.scss';

interface GraphicCardProps {
	coinHistory: CoinHistory[];
	graphicPeriod: GraphicPeriod;
	updateGraphicPeriod: (newValue: GraphicPeriod) => void;
}

function GraphicCard({
	coinHistory,
	graphicPeriod,
	updateGraphicPeriod,
}: GraphicCardProps) {
	function handlerUpdateGraphicPeriod(newPeriod: string) {
		switch (newPeriod) {
			case GraphicPeriod.m1: {
				updateGraphicPeriod(GraphicPeriod.m1);
				break;
			}
			case GraphicPeriod.w1: {
				updateGraphicPeriod(GraphicPeriod.w1);
				break;
			}
			case GraphicPeriod.d1: {
				updateGraphicPeriod(GraphicPeriod.d1);
				break;
			}
			default: {
				updateGraphicPeriod(graphicPeriod);
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

	return (
		<section className={styles.wrapper}>
			<header className={styles.header}>
				<Select
					label="Period per"
					name="period"
					options={graphicPeriodSelect}
					selectedOption={graphicPeriod}
					onChange={handlerUpdateGraphicPeriod}
				/>
			</header>
			<Graphic chartData={chartData} labels={labels} />
		</section>
	);
}

const MemoGraphicCard = memo(GraphicCard);
export default MemoGraphicCard;
