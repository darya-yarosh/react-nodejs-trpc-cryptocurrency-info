import { imageSrc } from "models/Interface";

export default interface Coin {
    id: string,
    rank: number,
    symbol: string,
    name: string,
    supply: number,
    maxSupply: number,
    marketCapUsd: string,
    volumeUsd24Hr: string,
    priceUsd: string,
    changePercent24Hr: string,
    vwap24Hr: number,
    logo: imageSrc,
}