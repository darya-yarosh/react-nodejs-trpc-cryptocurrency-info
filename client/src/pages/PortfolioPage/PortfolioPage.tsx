import { useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { CoinWithSummary } from 'models/Portfolio';

import Modal from 'components/general/Modal/Modal';
import PortfolioCard from 'components/PortfolioCard/PortfolioCard';

import {
	getCoinsActualPrice,
	mapTransactionsByCoin,
} from 'logic/utils/PortfolioHelper';

import { Context as PortfolioContext } from 'providers/portfolio';
import { createTRPCReact } from '@trpc/react-query';

import { AppRouter } from '../../../../server/src/appRouter';

const trpc = createTRPCReact<AppRouter>();

export default function PortfolioPage() {
	const navigate = useNavigate();

	const portfolio = useContext(PortfolioContext).data;

	const transactionSummaryList = useMemo(
		() => mapTransactionsByCoin(portfolio.transactionList),
		[portfolio.transactionList]
	);

	const portfolioCoins = trpc.getCoinList.useQuery({
		search: null,
		ids: transactionSummaryList.map((transaction) => transaction.id),
		offset: null,
		limit: null,
	}).data;

	const transactionCoins = useMemo(() => {
		if (portfolioCoins === undefined) return [];

		const loadedTransactionCoins: CoinWithSummary[] = [];

		transactionSummaryList.forEach((transactionSummary) => {
			const coin = portfolioCoins.find(
				(coin) => coin.id === transactionSummary.id
			);
			if (coin) {
				const transactionCoin: CoinWithSummary = {
					id: transactionSummary.id,
					amount: transactionSummary.amount,
					moneySpent: transactionSummary.moneySpent,
					name: coin.name,
					logo: coin.logo,
					priceUsd: coin.priceUsd,
				};
				loadedTransactionCoins.push(transactionCoin);
			}
		});
		return loadedTransactionCoins;
	}, [portfolioCoins, transactionSummaryList]);

	const favoriteCoins = trpc.getCoinList.useQuery({
		search: null,
		ids: portfolio.favorites.length > 0 ? portfolio.favorites : ['app-cryptocyrrency-test'],
		offset: null,
		limit: null,
	}).data || [];

	const portfolioActualPrice = useMemo(() => {
		if (portfolioCoins === undefined) return 0;

		const coinPrices = getCoinsActualPrice(
			portfolioCoins,
			transactionSummaryList
		);
		return coinPrices.reduce((total, coin) => total + coin.price, 0);
	}, [portfolioCoins, transactionSummaryList]);

	function navigateBack() {
		navigate('/');
	}

	if (!portfolio) return <div>Loading...</div>;

	return (
		<Modal handleDismiss={navigateBack}>
			<PortfolioCard
				isLoading={false}
				actualPrice={portfolioActualPrice}
				transactionCoins={transactionCoins}
				favoriteCoins={favoriteCoins}
				navigateBack={navigateBack}
			/>
		</Modal>
	);
}
