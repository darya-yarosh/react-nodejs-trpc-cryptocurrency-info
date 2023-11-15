export function formatVolumeUsd24Hr(volumeUsd24Hr: number) {
	return new Intl.NumberFormat('en', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(volumeUsd24Hr);
}

export function formatPercent(percent: string | null) {
	const percentDecimalStr = (percent !== null && percent !== undefined)
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

export function formatMarketCap(marketCap: number) {
	return new Intl.NumberFormat('en', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(marketCap);
}

export function formatPrice(price: string) {
	const priceDecimalStr = (price !== null && price !== undefined)
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
		nonZeroIndex++;
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
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(value) +
		' ' +
		symbol
	);
}
