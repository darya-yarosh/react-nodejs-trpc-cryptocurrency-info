import { createContext, useEffect, useState } from "react";

import Coin from "models/Coin";
import { Portfolio, emptyPortfolio } from "models/Portfolio";

import { portfolioLoader } from "logic/loaders/portfolio";
import PortfolioController from "logic/storage/UserPortfolioController";

export const Context = createContext<PortfolioContext>({
  loading: false,
  data: emptyPortfolio,
  addFavorite: () => {},
  removeFavorite: () => {},
  addTransaction: () => {},
});

interface PortfolioContext {
  loading: boolean;
  data: Portfolio;
  addFavorite: (id: Coin["id"]) => void;
  removeFavorite: (id: Coin["id"]) => void;
  addTransaction: (
    coinId: Coin["id"],
    coinPrice: number,
    coinAmount: number,
  ) => void;
}

export default function PortfolioProvider({
  children,
}: React.PropsWithChildren) {
  const [data, setData] = useState<Portfolio>(emptyPortfolio);
  const [loading, setLoading] = useState<boolean>(true);

  function addFavorite(id: Coin["id"]) {
    PortfolioController.addFavorite(id)
      .then((portfolio) => setData(portfolio))
      .catch((err) => console.error(err));
  }

  function removeFavorite(id: Coin["id"]) {
    PortfolioController.removeFavorite(id)
      .then((portfolio) => setData(portfolio))
      .catch((err) => console.error(err));
  }

  function addTransaction(
    coinId: Coin["id"],
    coinPrice: number,
    coinCount: number,
  ) {
    PortfolioController.addTransaction(coinId, coinPrice, coinCount)
      .then((portfolio) => {
        setData(portfolio);
        alert(
          "Purchase completed! You can check your balance in your portfolio page",
        );
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    portfolioLoader()
      .then((portfolio) => {
        setData(portfolio);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <Context.Provider
      value={{
        loading,
        data,
        addFavorite,
        removeFavorite,
        addTransaction,
      }}
    >
      {children}
    </Context.Provider>
  );
}
