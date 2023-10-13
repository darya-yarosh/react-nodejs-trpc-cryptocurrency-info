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

export const CoinLabels = {
  rank: "Rank",
  symbol: "Symbol",
  logo: "Logo",
  name: "Name",
  priceUsd: `Price ${PRICE_CURRENCY_VALUE}`,
  marketCapUsd: `MarketCap ${PRICE_CURRENCY_VALUE}`,
  volumeUsd24Hr: `24h %`,
  navigation: "Add in Portfolio",
  marketCap: "Market Cap",
  supply: "Supply",
  maxSupply: "MaxSupply",
}

export interface StorageCoinHistory {
  priceUsd: number;
  time: number;
  date: Date;
}

export interface CoinHistory {
  priceUsd: string;
  time: number;
  date: Date;
}
