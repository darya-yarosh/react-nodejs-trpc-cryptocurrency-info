import Coin from "models/Coin";
import { Portfolio } from "models/Portfolio";
import { Transaction } from 'models/Portfolio';

import { priceToNumber } from 'logic/utils/Helper';

import userPortfolioController from "logic/storage/UserPortfolioController";

export async function addTransaction(
    coinId: Coin['id'],
    coinPrice: number,
    coinCount: number,
) {
    const price = coinPrice * coinCount;

    const transaction: Transaction = {
        id: crypto.randomUUID(),
        coinId: coinId,
        coinCount: coinCount,
        coinPrice: price
    }

    const portfolio = await userPortfolioController.getPortfolio();
    portfolio.transactionList.push(transaction);

    userPortfolioController.setPortfolio(portfolio);
}

export function getSpentAmount(portfolio: Portfolio) {
    return getTransactionsSum(portfolio.transactionList);
}

export function getCoinSpentAmount(portfolio: Portfolio, coinId: Coin['id']) {
    const coinTransactions = portfolio.transactionList.filter(transaction => transaction.coinId === coinId);
    return getTransactionsSum(coinTransactions);
}

function getTransactionsSum(list: Transaction[]): number {
    return list.reduce(
        (price, transaction) => (
            price += transaction.coinPrice * transaction.coinCount
        ),
        0
    );
}

export function getTransactionsCoinList(list: Transaction[]): Coin['id'][] {
    return list.reduce<Coin['id'][]>((coins, transaction) => {
        if (!coins.includes(transaction.coinId)) {
            coins.push(transaction.coinId);
        }

        return coins;
    }, []);
}

export function mapTransactionsByCoin(
    list: Transaction[]
): CoinSummary[] {
    return list.reduce<CoinSummary[]>((result, transaction) => {
        const coinIndex = result.findIndex(c => c.id === transaction.coinId);

        if (coinIndex === -1) {
            result.push({
                id: transaction.coinId,
                amount: transaction.coinCount,
                moneySpent: transaction.coinCount * transaction.coinPrice,
            })
        } else {
            result[coinIndex].amount += transaction.coinCount;
            result[coinIndex].moneySpent += transaction.coinPrice * transaction.coinCount;
        }

        return result;
    }, []);
}

export function getCoinsActualPrice(
    actualCoinList: Coin[],
    coinList: CoinSummary[],
): CoinActualPrice[] {
    return coinList.map(coin => {
        const actualPrice = priceToNumber(actualCoinList.find(c => c.id === coin.id)?.priceUsd || "");
        return {
            coinId: coin.id,
            price: actualPrice * coin.amount
        }
    });
}

export type CoinSummary = {
    id: Coin['id'],
    amount: number,
    moneySpent: number
};

export type CoinActualPrice = {
    coinId: Coin['id'],
    price: number,
}