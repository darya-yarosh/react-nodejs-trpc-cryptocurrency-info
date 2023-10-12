import { ImageSrc } from "models/Interface";
import { PRICE_CURRENCY_VALUE } from "models/Price";

export default interface Coin {
  id: string;
  rank: number;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: number;
  logo: ImageSrc;
}

export const CoinTableLabels = {
  rank: "Rank",
  symbol: "Symbol",
  logo: "Logo",
  name: "Name",
  priceUsd: `Price ${PRICE_CURRENCY_VALUE}`,
  marketCapUsd: `MarketCap ${PRICE_CURRENCY_VALUE}`,
  volumeUsd24Hr: `24h %`,
  navigation: "Add in Portfolio",
};

export interface CoinHistory {
  priceUsd: number,
  time: number,
  date: Date
}