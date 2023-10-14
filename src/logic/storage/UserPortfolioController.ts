import Coin from "models/Coin";
import { Portfolio, Transaction } from "models/Portfolio";

class UserPortfolioController {
  async getPortfolio() {
    const stringData = localStorage.getItem("portfolio");
    if (stringData === null) {
      const userPortfolio: Portfolio = {
        transactionList: [],
        favorites: [],
      };
      this.setPortfolio(userPortfolio);
      return userPortfolio;
    }

    const data: Portfolio = JSON.parse(stringData.toString());
    return data;
  }

  async setPortfolio(newPortfolio: Portfolio) {
    const stringUpdatedPortfolio = JSON.stringify(newPortfolio);
    localStorage.setItem("portfolio", stringUpdatedPortfolio);
  }

  async addFavorite(id: Coin["id"]) {
    const portfolio = await this.getPortfolio();

    portfolio.favorites.push(id);

    await this.setPortfolio(portfolio);
    return portfolio;
  }

  async removeFavorite(id: Coin["id"]) {
    const portfolio = await this.getPortfolio();

    const newFavorites = portfolio.favorites.filter(
      (favCoin) => favCoin !== id,
    );

    const newPortfolio: Portfolio = {
      ...portfolio,
      favorites: newFavorites,
    };

    await this.setPortfolio(newPortfolio);
    return newPortfolio;
  }

  async addTransaction(
    coinId: Coin["id"],
    coinPrice: number,
    coinCount: number,
  ) {
    const transaction: Transaction = {
      id: crypto.randomUUID(),
      coinId: coinId,
      coinCount: coinCount,
      coinPrice: coinPrice,
    };

    const portfolio = await userPortfolioController.getPortfolio();
    portfolio.transactionList.push(transaction);

    userPortfolioController.setPortfolio(portfolio);
    return portfolio;
  }
}

const userPortfolioController = new UserPortfolioController();

export default userPortfolioController;
