import Coin from 'models/Coin';
import { Transaction } from 'models/Portfolio';
import { CoinActualPrice, CoinSummary, Portfolio } from 'models/Portfolio';

import { priceToNumber } from 'logic/utils/Helper';

export function getSpentAmount(portfolio: Portfolio) {
	return getTransactionsSum(portfolio.transactionList);
}

function getTransactionsSum(list: Transaction[]): number {
	return list.reduce(
		(price, transaction) =>
			(price += transaction.coinPrice * transaction.coinCount),
		0
	);
}

export function mapTransactionsByCoin(list: Transaction[]): CoinSummary[] {
	return list.reduce<CoinSummary[]>((result, transaction) => {
		const coinIndex = result.findIndex((c) => c.id === transaction.coinId);

		if (coinIndex === -1) {
			result.push({
				id: transaction.coinId,
				amount: transaction.coinCount,
				moneySpent: transaction.coinCount * transaction.coinPrice,
			});
		} else {
			result[coinIndex].amount += transaction.coinCount;
			result[coinIndex].moneySpent +=
				transaction.coinPrice * transaction.coinCount;
		}

		return result;
	}, []);
}

export function getCoinsActualPrice(
	actualCoinList: Coin[],
	coinList: CoinSummary[]
): CoinActualPrice[] {
	return coinList.map((coin) => {
		const actualPrice = priceToNumber(
			actualCoinList.find((c) => c.id === coin.id)?.priceUsd || '0'
		);
		return {
			coinId: coin.id,
			price: actualPrice * coin.amount,
		};
	});
}
