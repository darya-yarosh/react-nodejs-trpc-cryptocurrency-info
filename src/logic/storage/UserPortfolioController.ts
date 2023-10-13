import { Portfolio } from "models/Portfolio";

class UserPortfolioController {
    async getPortfolio() {
        const stringData = localStorage.getItem('portfolio');
        if (stringData === null) {
            const userPortfolio: Portfolio = {
                transactionList: [],
                favorites: [],
            }
            this.setPortfolio(userPortfolio);
            return userPortfolio;
        }

        const data: Portfolio = JSON.parse(stringData.toString());
        return data;
    }

    async setPortfolio(newPortfolio: Portfolio) {
        const stringUpdatedPortfolio = JSON.stringify(newPortfolio)
        localStorage.setItem('portfolio', stringUpdatedPortfolio);
    }
}

const userPortfolioController = new UserPortfolioController();

export default userPortfolioController;
