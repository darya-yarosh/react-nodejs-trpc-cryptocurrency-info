import Coin from "models/Coin";
import { SortOrder } from "models/Interface";

export function getFormattedPrice(price: number) {
    const priceDecimalStr = price.toString().split(".");

    let nonZeroIndex = 0;
    let currentNum = "0";
    while (currentNum === "0") {
        currentNum = (priceDecimalStr[1].toString())[nonZeroIndex];
        nonZeroIndex++;
    }

    return nonZeroIndex < 2
        ? new Intl.NumberFormat("en", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(price)
        : new Intl.NumberFormat("en", { style: "currency", currency: "USD", minimumFractionDigits: nonZeroIndex + 3, maximumFractionDigits: nonZeroIndex + 3 }).format(price)
}

export function getFilteredCoinList(coinList: Coin[], filter: string) {
    return (filter.trim().length > 0 && coinList.length > 0)
        ? coinList.filter(coin => coin.name.toLowerCase().includes(filter.trim().toLowerCase()))
        : coinList;
}

export enum CoinListSortType {
    rank = "Rank",
    priceUsd = "Price",
    marketCapUsd = "Market Cap",
    changePercent24Hr = "24h %",
}

function getUnformattedPrice(price: string) {
    return Number(price
        .replace("$", "")
        .replaceAll(",", ""));
}

function getUnformattedPercent(percent: string) {
    return Number(percent
        .replace("%", ""));
}

export function sortCoinList(
    coinList: Coin[],
    sortType: CoinListSortType,
    direction: SortOrder,
) {
    const placementFlag = direction === SortOrder.asc ? 1 : -1;

    switch (sortType) {
        case CoinListSortType.priceUsd:
            return coinList.sort((a, b) => getUnformattedPrice(a.priceUsd) > getUnformattedPrice(b.priceUsd)
                ? placementFlag
                : -placementFlag
            );
        case CoinListSortType.marketCapUsd:
            return coinList.sort((a, b) => getUnformattedPrice(a.marketCapUsd) > getUnformattedPrice(b.marketCapUsd)
                ? placementFlag
                : -placementFlag
            );
        case CoinListSortType.changePercent24Hr:
            return coinList.sort((a, b) => getUnformattedPercent(a.changePercent24Hr) >= getUnformattedPercent(b.changePercent24Hr)
                ? placementFlag
                : -placementFlag
            );
        case CoinListSortType.rank:
            return coinList.sort((a, b) => Number(a.rank) >= Number(b.rank)
                ? placementFlag
                : -placementFlag
            );
        default:
            return coinList;
    }
}
