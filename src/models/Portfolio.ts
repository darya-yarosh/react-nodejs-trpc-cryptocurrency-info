import Coin from "models/Coin";

export interface Portfolio {
    transactionList: Transaction[];
    favorites: Coin['id'][];
}

export interface Transaction {
    id: string,
    coinId: string,
    coinCount: number,
    coinPrice: number
}

export const emptyPortfolio: Portfolio = {
    transactionList: [],
    favorites: [],
}
