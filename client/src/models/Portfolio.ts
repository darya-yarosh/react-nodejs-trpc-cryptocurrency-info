import Coin from 'models/Coin';
import { ImageSrc } from 'models/Interface';

export interface Portfolio {
	transactionList: Transaction[];
	favorites: Coin['id'][];
}

export interface Transaction {
	id: string;
	coinId: string;
	coinCount: number;
	coinPrice: number;
}

export const emptyPortfolio: Portfolio = {
	transactionList: [],
	favorites: [],
};

export type CoinSummary = {
	id: Coin['id'];
	amount: number;
	moneySpent: number;
};

export type CoinActualPrice = {
	coinId: Coin['id'];
	price: number;
};

export interface CoinWithSummary {
	id: string;
	amount: number;
	moneySpent: number;
	name: string;
	logo: ImageSrc;
	priceUsd: string;
}
