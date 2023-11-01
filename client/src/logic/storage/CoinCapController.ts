import Coin, { CoinHistory, StorageCoinHistory } from "models/Coin";

import {
  formatPercent,
  formatMarketCap,
  formatPrice,
  formatSupply,
  formatVolumeUsd24Hr,
} from "logic/utils/Helper";

const API = "https://api.coincap.io/v2";

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
  async getCoinList(search?: string, ids?: string[], offset?: number, limit?: number) {
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
    };

    let url = API + "/assets?";
    if (search !== undefined) {
      url += `search=${search}&`;
    }
    if (ids !== undefined) {
      url += `ids=${ids.join()}&`;
    }
    if (offset !== undefined && limit !== undefined) {
      url += `offset=${offset}&limit=${limit}&`
    };

    const apiUrl = await fetch(url, requestOptions);
    const dataInfo = await apiUrl.json();

    const coinList: Coin[] = dataInfo.data.map((storageCoin: StorageCoin) => {
      const maxSupply = storageCoin.maxSupply === null ? Infinity : storageCoin.maxSupply;

      const coin: Coin = {
        id: storageCoin.id,
        rank: Number(storageCoin.rank),
        symbol: storageCoin.symbol,
        name: storageCoin.name,
        supply: formatSupply(storageCoin.supply, storageCoin.symbol),
        maxSupply: formatSupply(maxSupply, storageCoin.symbol),
        marketCapUsd: formatMarketCap(storageCoin.marketCapUsd),
        volumeUsd24Hr: formatVolumeUsd24Hr(storageCoin.volumeUsd24Hr),
        priceUsd: formatPrice(storageCoin.priceUsd),
        changePercent24Hr: formatPercent(storageCoin.changePercent24Hr),
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

    const apiUrl = await fetch(API + `/assets/${id}`, requestOptions);
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
      changePercent24Hr: formatPercent(storageCoin.changePercent24Hr),
      vwap24Hr: storageCoin.vwap24Hr,
      logo: `images/coins/${storageCoin.symbol.toLowerCase()}.svg`,
    };

    return coin;
  }

  async getCoinHistory(
    id: string,
    interval: CoinHistoryIntervalList,
    end?: Date,
    start?: Date,
  ) {
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
    };

    const url =
      end !== undefined && start !== undefined
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
          date: data.date,
        };
        return newCoinHistory;
      },
    );
    return coinHistory;
  }

  async getCoinMarkets(id: string) {
    const raw = "";

    const requestOptions: RequestInit = {
      method: "GET",
      body: raw,
      redirect: "follow",
    };

    await fetch(API + `/assets/${id}/markets`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  async getRates() {
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(API + "/rates", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  async getRateById(id: string) {
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(API + `/rates/${id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  async getExchanges() {
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(API + "/exchanges", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  async getExchangeById(id: string) {
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(API + `/exchanges/${id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  async getMarkets() {
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(API + "/markets", requestOptions)
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
      API +
      `/candles?exchange=poloniex&interval=${interval}&baseId=ethereum&quoteId=bitcoin\n`,
      requestOptions,
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }
}

const coinCapController = new CoinCapController();

export default coinCapController;
