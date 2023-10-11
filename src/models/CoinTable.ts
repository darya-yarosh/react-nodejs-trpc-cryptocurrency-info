import { MarketCap, PRICE_CURRENCY_VALUE, Price } from "models/Price";
import { imageSrc } from "models/Interface";

export interface CoinTableInterface {
    num: Number,
    symbol: string,
    logo: imageSrc,
    name: string,
    price: Price,
    marketCap: MarketCap,
    volumeUsd24Hr: PriceChange
}

type priceChangePer = "24h";
type priceChangeCurrency = "%";
const PRICE_CHANGE_PER_VALUE: priceChangePer = "24h"
const PRICE_CHANGE_CURRENCY_VALUE: priceChangeCurrency = "%";

interface PriceChange {
    per: priceChangePer,
    value: Number,
    currency: priceChangeCurrency
    isGrowth: boolean
}

export const CoinTableLabels = {
    rank: "Rank",
    symbol: "Symbol",
    logo: "Logo",
    name: "Name",
    priceUsd: `Price ${PRICE_CURRENCY_VALUE}`,
    marketCapUsd: `MarketCap ${PRICE_CURRENCY_VALUE}`,
    volumeUsd24Hr: `${PRICE_CHANGE_PER_VALUE} ${PRICE_CHANGE_CURRENCY_VALUE}`,
    navigation: "Add in Portfolio",
}