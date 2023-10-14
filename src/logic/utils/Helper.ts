import Coin from "models/Coin";
import { SortOrder } from "models/Interface";

export function filterCoinList(coinList: Coin[], filter: string) {
  return filter.trim().length > 0 && coinList.length > 0
    ? coinList.filter((coin) =>
        coin.name.toLowerCase().includes(filter.trim().toLowerCase()),
      )
    : coinList;
}

export enum CoinListSortType {
  rank = "Rank",
  priceUsd = "Price",
  marketCapUsd = "Market Cap",
  changePercent24Hr = "24h %",
}

export function priceToNumber(price: string) {
  return Number(price.replace("$", "").replaceAll(",", ""));
}

export function percentToNumber(percent: string) {
  return Number(percent.replace("%", ""));
}

export function formatPrice(price: number) {
  const priceDecimalStr = String(price).split(".");

  let nonZeroIndex = 0;
  let currentNum = "0";
  while (currentNum === "0") {
    currentNum = String(priceDecimalStr[1])[nonZeroIndex];
    nonZeroIndex++;
  }

  return nonZeroIndex < 2
    ? new Intl.NumberFormat("en", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(price)
    : new Intl.NumberFormat("en", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: nonZeroIndex + 3,
        maximumFractionDigits: nonZeroIndex + 3,
      }).format(price);
}

export function formatSupply(supply: number, symbol: string) {
  return (
    new Intl.NumberFormat("en", {
      maximumFractionDigits: 0,
    }).format(supply) +
    " " +
    symbol
  );
}

export function formatMarketCap(marketCap: number) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(marketCap);
}

export function formatVolumeUsd24Hr(volumeUsd24Hr: number) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(volumeUsd24Hr);
}

export function formatChangePercent24Hr(changePercent24Hr: number) {
  const priceDecimalStr = String(changePercent24Hr).split(".");

  let nonZeroIndex = 0;
  let currentNum = "0";
  while (currentNum === "0") {
    currentNum = String(priceDecimalStr[1])[nonZeroIndex];
    nonZeroIndex++;
  }

  return nonZeroIndex <= 2
    ? new Intl.NumberFormat("en", {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(changePercent24Hr / 100)
    : new Intl.NumberFormat("en", {
        style: "percent",
        minimumFractionDigits: nonZeroIndex + 3,
        maximumFractionDigits: nonZeroIndex + 3,
      }).format(changePercent24Hr / 100);
}

export function sortCoinList(
  coinList: Coin[],
  sortType: CoinListSortType,
  direction: SortOrder,
) {
  const placementFlag = direction === SortOrder.asc ? 1 : -1;

  switch (sortType) {
    case CoinListSortType.priceUsd:
      return coinList.sort((a, b) =>
        priceToNumber(a.priceUsd) > priceToNumber(b.priceUsd)
          ? placementFlag
          : -placementFlag,
      );
    case CoinListSortType.marketCapUsd:
      return coinList.sort((a, b) =>
        priceToNumber(a.marketCapUsd) > priceToNumber(b.marketCapUsd)
          ? placementFlag
          : -placementFlag,
      );
    case CoinListSortType.changePercent24Hr:
      return coinList.sort((a, b) =>
        percentToNumber(a.changePercent24Hr) >=
        percentToNumber(b.changePercent24Hr)
          ? placementFlag
          : -placementFlag,
      );
    case CoinListSortType.rank:
      return coinList.sort((a, b) =>
        Number(a.rank) >= Number(b.rank) ? placementFlag : -placementFlag,
      );
    default:
      return coinList;
  }
}
