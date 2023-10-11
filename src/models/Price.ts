type priceCurrency = "$";
export const PRICE_CURRENCY_VALUE: priceCurrency = "$";

export interface Price {
    currency: priceCurrency,
    value: Number,
}

export interface MarketCap {
    currency: priceCurrency,
    value: Number
}