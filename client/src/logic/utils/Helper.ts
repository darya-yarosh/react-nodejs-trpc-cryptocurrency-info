import Coin from 'models/Coin';
import { SortOrder } from 'models/Interface';

export enum CoinListSortType {
	rank = 'Rank',
	priceUsd = 'Price',
	marketCapUsd = 'Market Cap',
	changePercent24Hr = '24h %',
}

export function priceToNumber(price: string) {
	return Number(price.replace('$', '').replaceAll(',', ''));
}

export function percentToNumber(percent: string) {
	return Number(percent.replace('%', ''));
}

export function supplyToNumber(supply: string, symbol: Coin['symbol']) {
	const value = supply.replace(symbol, '').replaceAll(' ', '');

	if (value === '∞') return Infinity;

	return Number(value.replaceAll(',', ''));
}

export function formatPrice(price: string) {
	const priceDecimalStr = price !== undefined
		? price.split('.')
		: '0'.split('.');

	if (priceDecimalStr[1] === undefined) {
		priceDecimalStr.push('00');
	}

	let nonZeroIndex = 0;
	let currentNum = '0';
	while (currentNum === '0'
		&& nonZeroIndex < priceDecimalStr[1].length
	) {
		currentNum = String(priceDecimalStr[1])[nonZeroIndex];
		nonZeroIndex += 1;
	}

	const priceDecimalStrTail =
		'0'.repeat(nonZeroIndex - 1)
		+ priceDecimalStr[1][nonZeroIndex - 1]
		+ (priceDecimalStr[1][nonZeroIndex] !== undefined
			? priceDecimalStr[1][nonZeroIndex]
			: '0')
		+ (priceDecimalStr[1][nonZeroIndex + 1] !== undefined
			? priceDecimalStr[1][nonZeroIndex + 1]
			: '0')
		+ (priceDecimalStr[1][nonZeroIndex + 2] !== undefined
			? priceDecimalStr[1][nonZeroIndex + 2]
			: '0');

	return nonZeroIndex <= 2
		? new Intl.NumberFormat('en', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(Number(price))
		: new Intl.NumberFormat('en', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(Number(priceDecimalStr[0]))
		+ '.' + priceDecimalStrTail.toString();
}

export function formatSupply(supply: number | null, symbol: string) {
	const value = supply === null ? Infinity : supply;

	return (
		new Intl.NumberFormat('en', {
			maximumFractionDigits: 0,
		}).format(value) +
		' ' +
		symbol
	);
}

export function formatMarketCap(marketCap: number) {
	return new Intl.NumberFormat('en', {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: 0,
	}).format(marketCap);
}

export function formatVolumeUsd24Hr(volumeUsd24Hr: number) {
	return new Intl.NumberFormat('en', {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: 0,
	}).format(volumeUsd24Hr);
}

export function formatPercent(percent: string) {
	const percentDecimalStr = percent !== undefined
		? percent.split('.')
		: '0'.split('.');

	if (percentDecimalStr[1] === undefined) {
		percentDecimalStr.push('00');
	}

	let nonZeroIndex = 0;
	let currentNum = '0';
	while (currentNum === '0'
		&& nonZeroIndex < percentDecimalStr[1].length
	) {
		currentNum = String(percentDecimalStr[1])[nonZeroIndex];
		nonZeroIndex++;
	}

	return nonZeroIndex <= 2
		? new Intl.NumberFormat('en', {
			style: 'percent',
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(Number(percentDecimalStr.join('.')) / 100)
		: new Intl.NumberFormat('en', {
			style: 'percent',
			minimumFractionDigits: nonZeroIndex + 3,
			maximumFractionDigits: nonZeroIndex + 3,
		}).format(Number(percentDecimalStr.join('.')) / 100);
}

export function sortCoinList(
	coinList: Coin[],
	sortType: CoinListSortType,
	direction: SortOrder
) {
	const placementFlag = direction === SortOrder.asc ? 1 : -1;

	switch (sortType) {
		case CoinListSortType.priceUsd:
			return coinList.sort((a, b) =>
				priceToNumber(a.priceUsd) > priceToNumber(b.priceUsd)
					? placementFlag
					: -placementFlag
			);
		case CoinListSortType.marketCapUsd:
			return coinList.sort((a, b) =>
				priceToNumber(a.marketCapUsd) > priceToNumber(b.marketCapUsd)
					? placementFlag
					: -placementFlag
			);
		case CoinListSortType.changePercent24Hr:
			return coinList.sort((a, b) =>
				percentToNumber(a.changePercent24Hr) >=
					percentToNumber(b.changePercent24Hr)
					? placementFlag
					: -placementFlag
			);
		case CoinListSortType.rank:
			return coinList.sort((a, b) =>
				Number(a.rank) >= Number(b.rank)
					? placementFlag
					: -placementFlag
			);
		default:
			return coinList;
	}
}

export function getDateDayAgo(startDate: Date) {
	const oneDayInMS = 86400000;
	const endDate = new Date(startDate.getTime() - 1 * oneDayInMS);;
	return endDate;
}

export function getDateWeekAgo(startDate: Date) {
	const oneDayInMS = 86400000;
	const endDate = new Date(startDate.getTime() - 7 * oneDayInMS);
	return endDate;
}

export function getDateMonthAgo(startDate: Date) {
	const endDate = new Date(startDate)
	endDate.setMonth(startDate.getMonth() - 1);
	return endDate;
}