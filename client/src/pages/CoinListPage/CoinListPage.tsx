import { useContext, useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { createTRPCReact } from '@trpc/react-query';

import { APP_NAME, SEARCH_PLACEHOLDER } from 'models/Interface';

import CoinTable from 'components/CoinTable/CoinTable';
import Pagination from 'components/general/Pagination/Pagination';
import SearchInput from 'components/general/SearchInput/SearchInput';
import TrendingCoins from 'components/TrendingCoins/TrendingCoins';
import PortfolioLiteCard from 'components/PortfolioLiteCard/PortfolioLiteCard';

import {
	getCoinsActualPrice,
	mapTransactionsByCoin,
} from 'logic/utils/PortfolioHelper';

import { Context as PortfolioContext } from 'providers/portfolio';

import styles from 'pages/CoinListPage/CoinListPage.module.scss';

import { AppRouter } from '../../../../server/src/appRouter';

const trpc = createTRPCReact<AppRouter>();

export default function CoinListPage() {
	const portfolio = useContext(PortfolioContext).data;

	const [pageIndex, setPageIndex] = useState<number>(0);
	const [searchFilter, setSearchFilter] = useState<string>('');

	/**
	 * The function returns the three most popular coins.
	 * Since all coins in the database are sorted by rank,
	 * the first three elements are taken.
	 *
	 * @returns A list of three popular coins.
	 */
	const coinsTopThree =
		trpc.getCoinList.useQuery({
			search: null,
			ids: null,
			offset: 0,
			limit: 3,
		}).data || null;


	const COINS_PER_PAGE = 10;

	const coinList = trpc.getCoinList.useQuery({
		search: searchFilter === '' ? null : searchFilter,
		ids: null,
		offset: pageIndex * COINS_PER_PAGE,
		limit: COINS_PER_PAGE,
	}).data;

	const PAGES_LIMIT = useMemo(
		() => (coinList?.length || 0) / COINS_PER_PAGE,
		[coinList]
	);
	const isLastPage = useMemo(() => PAGES_LIMIT < 1, [PAGES_LIMIT]);

	const transactionSummaryList = useMemo(
		() => mapTransactionsByCoin(portfolio.transactionList),
		[portfolio.transactionList]
	);

	const portfolioCoins =
		trpc.getCoinList.useQuery({
			search: null,
			ids: transactionSummaryList.map((transaction) => transaction.id),
			offset: null,
			limit: null,
		}).data || [];

	const portfolioActualPrice = useMemo(() => {
		if (portfolioCoins.length === 0) return 0;

		const coinPrices = getCoinsActualPrice(
			portfolioCoins,
			transactionSummaryList
		);
		return coinPrices.reduce((total, coin) => total + coin.price, 0);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [portfolioCoins]);

	useEffect(() => {
		setPageIndex(0);
	}, [searchFilter]);

	return (
		<div className={styles.wrapper}>
			{coinsTopThree && (
				<header className={styles.header}>
					<section className={styles.header__sectionFirst}>
						<h1 className={styles.appName}>{APP_NAME}</h1>
						<SearchInput
							value={searchFilter}
							placeholderValue={SEARCH_PLACEHOLDER}
							onChange={setSearchFilter}
						/>
					</section>
					<section className={styles.header__sectionSecond}>
						<TrendingCoins coinList={coinsTopThree} />
						<PortfolioLiteCard actualPrice={portfolioActualPrice} />
					</section>
				</header>
			)}
			{coinList && (
				<section className={styles.body}>
					<CoinTable coinList={coinList} />
					<Pagination
						isLastPage={isLastPage}
						currentPageInd={pageIndex}
						changePage={setPageIndex}
					/>
				</section>
			)}
			<Outlet />
		</div>
	);
}
