import Coin from "models/Coin";

import { getFormattedPrice } from "logic/utils/Helper";

type CoinHistoryIntervalList =
  | "m1"
  | "m5"
  | "m15"
  | "m30"
  | "h1"
  | "h2"
  | "h6"
  | "h12"
  | "d1";
type CandlesIntervalList =
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
    const data: Coin[] = dataInfo.data.map((cryptocoin: StorageCoin) => {
      const formattedPrice = getFormattedPrice(cryptocoin.priceUsd);
      const formattedMarketCap = new Intl.NumberFormat("en", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(cryptocoin.marketCapUsd);
      const formattedVolumeUsd24Hr = new Intl.NumberFormat("en", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(cryptocoin.volumeUsd24Hr);
      const formatterChangePercent24Hr = new Intl.NumberFormat("en", {
        style: "percent",
        minimumFractionDigits: 2,
      }).format(cryptocoin.changePercent24Hr / 100);

      const newCoin: Coin = {
        id: cryptocoin.id,
        rank: cryptocoin.rank,
        symbol: cryptocoin.symbol,
        name: cryptocoin.name,
        supply: cryptocoin.supply,
        maxSupply: cryptocoin.maxSupply,
        marketCapUsd: formattedMarketCap,
        volumeUsd24Hr: formattedVolumeUsd24Hr,
        priceUsd: formattedPrice,
        changePercent24Hr: formatterChangePercent24Hr,
        vwap24Hr: cryptocoin.vwap24Hr,
        logo: `images/coins/${cryptocoin.symbol.toLowerCase()}.svg`,
      };

      return newCoin;
    });
    return data;
  }

  async getCoinById(id: string) {
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(`api.coincap.io/v2/assets/${id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  async getCoinHistory(id: string, interval: CoinHistoryIntervalList) {
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `api.coincap.io/v2/assets/${id}/history?interval=${interval}`,
      requestOptions,
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
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
