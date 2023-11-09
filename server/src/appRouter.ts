import { initTRPC } from '@trpc/server';
import Coin, {
	CoinHistory,
	CoinHistoryIntervalList,
	StorageCoin,
	StorageCoinHistory,
} from './models/Coin';
import {
	formatSupply,
	formatMarketCap,
	formatVolumeUsd24Hr,
	formatPrice,
	formatPercent,
} from './logic/helper';

type getCoinListInput = {
	search: string | null;
	ids: string[] | null;
	offset: number | null;
	limit: number | null;
};

type getCoinHistoryInput = {
	id: string;
	interval: CoinHistoryIntervalList;
	end: Date | null;
	start: Date | null;
};

const API = 'https://api.coincap.io/v2';

const trpc = initTRPC.create();

const appRouter = trpc.router({
	getCoinList: trpc.procedure
		.input((value): getCoinListInput => {
			const valueAsType = value as getCoinListInput;

			const isValidObject = value !== null && typeof value === 'object';

			const isValidSearch =
				value?.hasOwnProperty('search') &&
				(valueAsType.search === null ||
					typeof valueAsType.search === 'string');

			const isValidIds =
				value?.hasOwnProperty('ids') &&
				(typeof valueAsType.ids === null ||
					typeof valueAsType.ids === 'object');

			const isValidOffset =
				value?.hasOwnProperty('offset') &&
				(valueAsType.offset === null ||
					typeof valueAsType.offset === 'number');

			const isValidLimit =
				value?.hasOwnProperty('limit') &&
				(valueAsType.limit === null ||
					typeof valueAsType.limit === 'number');

			if (
				isValidObject &&
				isValidSearch &&
				isValidIds &&
				isValidOffset &&
				isValidLimit
			) {
				return value as getCoinListInput;
			}

			throw new Error('Error[getCoinList]: Input is not a valid object.');
		})
		.query(async (opts) => {
			const { input } = opts;
			const { search, ids, offset, limit } = input;

			const requestOptions: RequestInit = {
				method: 'GET',
				redirect: 'follow',
			};

			let url = API + '/assets?';
			if (search !== null) {
				url += `search=${search}&`;
			}
			if (ids !== null) {
				url += `ids=${ids.join()}&`;
			}
			if (offset !== null && limit !== null) {
				url += `offset=${offset}&limit=${limit}&`;
			}

			const apiUrl = await fetch(url, requestOptions);
			const dataInfo = await apiUrl.json();

			const coinList: Coin[] = dataInfo.data.map(
				(storageCoin: StorageCoin) => {
					const maxSupply =
						storageCoin.maxSupply === null
							? Infinity
							: storageCoin.maxSupply;

					const coin: Coin = {
						id: storageCoin.id,
						rank: Number(storageCoin.rank),
						symbol: storageCoin.symbol,
						name: storageCoin.name,
						supply: formatSupply(
							Number(storageCoin.supply),
							storageCoin.symbol
						),
						maxSupply: formatSupply(Number(maxSupply), storageCoin.symbol),
						marketCapUsd: formatMarketCap(Number(storageCoin.marketCapUsd)),
						volumeUsd24Hr: formatVolumeUsd24Hr(
							Number(storageCoin.volumeUsd24Hr)
						),
						priceUsd: formatPrice(storageCoin.priceUsd),
						changePercent24Hr: formatPercent(
							storageCoin.changePercent24Hr
						),
						vwap24Hr: Number(storageCoin.vwap24Hr),
						logo: `images/coins/${storageCoin.symbol.toLowerCase()}.svg`,
					};
					return coin;
				}
			);
			return coinList;
		}),
	getCoinById: trpc.procedure
		.input((id): string => {
			if (typeof id === 'string') {
				return id;
			}

			throw new Error('Error[getCoinById]: Input is not a string.');
		})
		.query(async (opts) => {
			const id = opts.input;

			const requestOptions: RequestInit = {
				method: 'GET',
				redirect: 'follow',
			};

			const apiUrl = await fetch(API + `/assets/${id}`, requestOptions);
			const dataInfo = await apiUrl.json();
			const storageCoin: StorageCoin = dataInfo.data;
			const coin: Coin = {
				id: storageCoin.id,
				rank: Number(storageCoin.rank),
				symbol: storageCoin.symbol,
				name: storageCoin.name,
				supply: formatSupply(Number(storageCoin.supply), storageCoin.symbol),
				maxSupply: formatSupply(
					Number(storageCoin.maxSupply),
					storageCoin.symbol
				),
				marketCapUsd: formatMarketCap(Number(storageCoin.marketCapUsd)),
				volumeUsd24Hr: formatVolumeUsd24Hr(Number(storageCoin.volumeUsd24Hr)),
				priceUsd: formatPrice(storageCoin.priceUsd),
				changePercent24Hr: formatPercent(storageCoin.changePercent24Hr),
				vwap24Hr: Number(storageCoin.vwap24Hr),
				logo: `images/coins/${(storageCoin.symbol || '').toLowerCase()}.svg`,
			};

			return coin;
		}),
	getCoinHistory: trpc.procedure
		.input((value): getCoinHistoryInput => {
			const valueAsType = value as getCoinHistoryInput;

			const isValidObject = value !== null && typeof value === 'object';

			const isValidId =
				value?.hasOwnProperty('id') &&
				typeof valueAsType.id === 'string';

			const isValidInterval =
				value?.hasOwnProperty('interval') &&
				typeof valueAsType.interval === 'string' &&
				valueAsType.interval ===
				(valueAsType.interval as CoinHistoryIntervalList);

			const isValidEnd =
				value?.hasOwnProperty('end') &&
				(valueAsType.end === null ||
					(typeof valueAsType.end === 'string' &&
						new Date(valueAsType.end).toString() !==
						'Invalid Date'));

			const isValidStart =
				value?.hasOwnProperty('start') &&
				(valueAsType.start === null ||
					(typeof valueAsType.start === 'string' &&
						new Date(valueAsType.start).toString() !==
						'Invalid Date'));

			if (
				isValidObject &&
				isValidId &&
				isValidInterval &&
				isValidEnd &&
				isValidStart
			) {
				const endDate =
					valueAsType.end === null ? null : new Date(valueAsType.end);
				const startDate =
					valueAsType.start === null
						? null
						: new Date(valueAsType.start);

				const validValue: getCoinHistoryInput = {
					id: valueAsType.id,
					interval: valueAsType.interval,
					end: endDate,
					start: startDate,
				};
				return validValue;
			}

			throw new Error(
				'Error[getCoinHistory]: Input is not a valid object.'
			);
		})
		.query(async (opts) => {
			const { input } = opts;
			const { id, interval, end, start } = input;

			const requestOptions: RequestInit = {
				method: 'GET',
				redirect: 'follow',
			};

			const url =
				end !== null && start !== null
					? API +
					`/assets/${id}/history?interval=${interval}&end=${+end}&start=${+start}`
					: API + `/assets/${id}/history?interval=${interval}`;
			const apiUrl = await fetch(url, requestOptions);
			const dataInfo = await apiUrl.json();
			const coinHistory: CoinHistory[] = dataInfo.data.map(
				(data: StorageCoinHistory) => {
					const newCoinHistory: CoinHistory = {
						priceUsd: formatPrice(data.priceUsd),
						time: data.time,
						date: new Date(data.time),
					};

					return newCoinHistory;
				}
			);

			return coinHistory as CoinHistory[];
		}),
});

export type AppRouter = typeof appRouter;
export default appRouter;
