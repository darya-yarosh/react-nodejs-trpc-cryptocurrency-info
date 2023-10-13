import { Portfolio } from "models/Portfolio";

import userPortfolioController from "logic/storage/UserPortfolioController";

export async function portfolioLoader() {
    const portfolio: Portfolio = await userPortfolioController.getPortfolio();
    return portfolio;
}
