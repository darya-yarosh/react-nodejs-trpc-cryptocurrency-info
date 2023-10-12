import Coin, { CoinHistory } from "models/Coin";

import {
  formatChangePercent24Hr,
  formatMarketCap,
  formatPrice,
  formatSupply,
  formatVolumeUsd24Hr,
} from "logic/utils/Helper";

export type CoinHistoryIntervalList =
  | "m1"
  | "m5"
  | "m15"
  | "m30"
  | "h1"
  | "h2"
  | "h6"
  | "h12"
  | "d1";
export type CandlesIntervalList =
  | "m1"
  | "m5"
  | "m15"
  | "m30"
  | "h1"
  | "h2"
  | "h6"
  | "h12"
  | "d1"
  | "w1";

interface StorageCoin {
  id: string;
  rank: number;
  symbol: string;
  name: string;
  supply: number;
  maxSupply: number;
  marketCapUsd: number;
  volumeUsd24Hr: number;
  priceUsd: number;
  changePercent24Hr: number;
  vwap24Hr: number;
}

class CoinCapController {
  async getCoinList() {
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
    };

    const apiUrl = await fetch(
      "https://api.coincap.io/v2/assets",
      requestOptions,
    );

    const dataInfo = await apiUrl.json();
    const coinList: Coin[] = dataInfo.data.map((storageCoin: StorageCoin) => {
      const coin: Coin = {
        id: storageCoin.id,
        rank: storageCoin.rank,
        symbol: storageCoin.symbol,
        name: storageCoin.name,
        supply: formatSupply(storageCoin.supply, storageCoin.symbol),
        maxSupply: formatSupply(storageCoin.maxSupply, storageCoin.symbol),
        marketCapUsd: formatMarketCap(storageCoin.marketCapUsd),
        volumeUsd24Hr: formatVolumeUsd24Hr(storageCoin.volumeUsd24Hr),
        priceUsd: formatPrice(storageCoin.priceUsd),
        changePercent24Hr: formatChangePercent24Hr(
          storageCoin.changePercent24Hr,
        ),
        vwap24Hr: storageCoin.vwap24Hr,
        logo: `images/coins/${storageCoin.symbol.toLowerCase()}.svg`,
      };

      return coin;
    });
    return coinList;
  }

  async getCoinById(id: string) {
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
    };

    const apiUrl = await fetch(
      `https://api.coincap.io/v2/assets/${id}`,
      requestOptions,
    );
    const dataInfo = await apiUrl.json();
    const storageCoin: StorageCoin = dataInfo.data;
    const coin: Coin = {
      id: storageCoin.id,
      rank: storageCoin.rank,
      symbol: storageCoin.symbol,
      name: storageCoin.name,
      supply: formatSupply(storageCoin.supply, storageCoin.symbol),
      maxSupply: formatSupply(storageCoin.maxSupply, storageCoin.symbol),
      marketCapUsd: formatMarketCap(storageCoin.marketCapUsd),
      volumeUsd24Hr: formatVolumeUsd24Hr(storageCoin.volumeUsd24Hr),
      priceUsd: formatPrice(storageCoin.priceUsd),
      changePercent24Hr: formatChangePercent24Hr(storageCoin.changePercent24Hr),
      vwap24Hr: storageCoin.vwap24Hr,
      logo: `images/coins/${storageCoin.symbol.toLowerCase()}.svg`,
    };

    return coin;
  }

  async getCoinHistory(id: string, interval: CoinHistoryIntervalList) {
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
    };

    const apiUrl = await fetch(
      `https://api.coincap.io/v2/assets/${id}/history?interval=${interval}`,
      requestOptions,
    );
    const dataInfo = await apiUrl.json();
    const coinHistory: CoinHistory = dataInfo.data;
    return coinHistory;
  }

  async getCoinMarkets(id: string) {
    const raw = "";

    const requestOptions: RequestInit = {
      method: "GET",
      body: raw,
      redirect: "follow",
    };

    await fetch(`api.coincap.io/v2/assets/${id}/markets`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  async getRates() {
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
    };

    await fetch("api.coincap.io/v2/rates", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  async getRateById(id: string) {
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(`api.coincap.io/v2/rates/${id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  async getExchanges() {
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
    };

    await fetch("api.coincap.io/v2/exchanges", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  async getExchangeById(id: string) {
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(`api.coincap.io/v2/exchanges/${id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  async getMarkets() {
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
    };

    await fetch("api.coincap.io/v2/markets", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  async getCandles(id: string, interval: CandlesIntervalList) {
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(
      `api.coincap.io/v2/candles?exchange=poloniex&interval=${interval}&baseId=ethereum&quoteId=bitcoin\n`,
      requestOptions,
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }
}

const coinCapController = new CoinCapController();

export default coinCapController;
