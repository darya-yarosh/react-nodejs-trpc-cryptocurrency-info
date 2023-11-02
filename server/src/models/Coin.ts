import { ImageSrc } from "./General";

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

export interface StorageCoin {
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

export enum GraphicPeriod {
    d1 = "d1",
    w1 = "w1",
    m1 = "m1",
}

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

