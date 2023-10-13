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

const mock: Portfolio = {
    transactionList: [
        { id: "1", coinId: "bitcoin", coinCount: 10, coinPrice: 8142 },
        { id: "2", coinId: "bitcoin", coinCount: 7, coinPrice: 8042 },
        { id: "3", coinId: "bitcoin", coinCount: 13, coinPrice: 8242 },
        { id: "4", coinId: "bitcoin", coinCount: 25, coinPrice: 8342 },
        { id: "5", coinId: "bitcoin", coinCount: 1, coinPrice: 8542 },
        { id: "6", coinId: "ethereum", coinCount: 10, coinPrice: 100 },
        { id: "7", coinId: "ethereum", coinCount: 19, coinPrice: 80 },
        { id: "8", coinId: "ethereum", coinCount: 12, coinPrice: 60 },
    ],
    favorites: [
        "bitcoin",
        "ethereum",
        "dogecoin",
        "ripple"
    ]
}