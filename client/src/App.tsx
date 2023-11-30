import { useState } from 'react';
import { httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom';

import { AppRouter } from '../../server/src/appRouter';

import CoinPage from 'pages/CoinPage/CoinPage';
import ErrorPage from 'pages/ErrorPage/ErrorPage';
import CoinListPage from 'pages/CoinListPage/CoinListPage';
import PortfolioPage from 'pages/PortfolioPage/PortfolioPage';
import TransactionPage from 'pages/TransactionPage/TransactionPage';

import PortfolioProvider from 'providers/portfolio';

import 'App.scss';

const trpc = createTRPCReact<AppRouter>();

export const router = createBrowserRouter(
	createRoutesFromElements([
		<Route
			path="/"
			element={<CoinListPage />}
			errorElement={
				<ErrorPage description="An error occurred on the main page." />
			}
		>
			<Route
				path="/portfolio"
				element={<PortfolioPage />}
				errorElement={
					<ErrorPage description="An error occurred on the portfolio page." />
				}
			/>
		</Route>,
		<Route
			path="cryptocoins/:id"
			element={<CoinPage />}
			errorElement={
				<ErrorPage description="An error occurred on the coin page." />
			}
		/>,
		<Route
			path="/purchase/:id?"
			element={<TransactionPage />}
			errorElement={
				<ErrorPage description="An error occurred on the transaction page." />
			}
		/>,
	])
);

export default function App() {
	const [queryClient] = useState(() => new QueryClient());
	
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					url: 'https://project-deployment--yds-cryptocurrency-server.netlify.app/trpc',
				}),
			],
		})
	);

	return (
		<div className="app" id="app">
			<div className="app__wrapper">
				<trpc.Provider client={trpcClient} queryClient={queryClient}>
					<QueryClientProvider client={queryClient}>
						<PortfolioProvider>
							<RouterProvider router={router} />
						</PortfolioProvider>
					</QueryClientProvider>
				</trpc.Provider>
			</div>
		</div>
	);
}
