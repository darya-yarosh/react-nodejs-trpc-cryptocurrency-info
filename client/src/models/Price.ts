type PriceCurrency = '$';
export const PRICE_CURRENCY_VALUE: PriceCurrency = '$';

export interface Price {
	currency: PriceCurrency;
	value: Number;
}

export interface MarketCap {
	currency: PriceCurrency;
	value: Number;
}
