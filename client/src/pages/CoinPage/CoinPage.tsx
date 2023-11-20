import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TRPCClientError, createTRPCReact } from '@trpc/react-query';

import { CoinHistory, GraphicPeriod } from 'models/Coin';

import TextCard from 'components/TextCard/TextCard';
import GraphicCard from 'components/GraphicCard/GraphicCard';

import {
	getDateDayAgo,
	getDateMonthAgo,
	getDateWeekAgo,
} from 'logic/utils/Helper';

import styles from 'pages/CoinPage/CoinPage.module.scss';

import { AppRouter } from '../../../../server/src/appRouter';

const trpc = createTRPCReact<AppRouter>();

export default function CoinPage() {
	const navigate = useNavigate();
	const params = useParams();

	const coinData = trpc.getCoinById.useQuery(params.id || '');
	if (coinData.data === null) {
		throw new TRPCClientError(
			'Error loading the specified coin from the database: invalid coin id.'
		)
	}
	const coin = useMemo(() => coinData.data, [coinData.data]);

	const [graphicPeriod, setGraphicPeriod] = useState<GraphicPeriod>(
		GraphicPeriod.d1
	);
	const graphicInterval = useMemo(
		() =>
			graphicPeriod === GraphicPeriod.m1
				? 'd1'
				: graphicPeriod === GraphicPeriod.w1
					? 'h12'
					: graphicPeriod === GraphicPeriod.d1
						? 'm30'
						: 'm30',
		[graphicPeriod]
	);
	const [startDate, endDate] = useMemo(
		() =>
			graphicPeriod === GraphicPeriod.m1
				? [getDateMonthAgo(new Date()), new Date()]
				: graphicPeriod === GraphicPeriod.w1
					? [getDateWeekAgo(new Date()), new Date()]
					: graphicPeriod === GraphicPeriod.d1
						? [getDateDayAgo(new Date()), new Date()]
						: [getDateDayAgo(new Date()), new Date()],
		[graphicPeriod]
	);

	const coinHistoryData = trpc.getCoinHistory.useQuery({
		id: params.id || coin?.id || '',
		interval: graphicInterval,
		end: endDate,
		start: startDate,
	});
	const coinHistory = coinHistoryData.data as unknown as CoinHistory[];

	function updateGraphicPeriod(newValue: GraphicPeriod) {
		setGraphicPeriod(newValue);
	}

	const navigateBack = useMemo(
		() => () => {
			navigate('/');
		},
		[navigate]
	);

	if (!coin) return <div>Loading...</div>;

	return (
		<div className={styles.wrapper}>
			<TextCard coin={coin} closePage={navigateBack} />
			{!coinHistory && <div>Loading...</div>}
			{coinHistory && (
				<GraphicCard
					coinHistory={coinHistory}
					graphicPeriod={graphicPeriod}
					updateGraphicPeriod={updateGraphicPeriod}
				/>
			)}
		</div>
	);
}
