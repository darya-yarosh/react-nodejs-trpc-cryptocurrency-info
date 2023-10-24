import { createContext, useEffect, useState } from "react";

import Coin from "models/Coin";
import { Portfolio, emptyPortfolio } from "models/Portfolio";

import { portfolioLoader } from "logic/loaders/portfolio";
import PortfolioController from "logic/storage/UserPortfolioController";

export const Context = createContext<PortfolioContext>({
  loading: false,
  data: emptyPortfolio,
  addFavorite: async () => { },
  removeFavorite: async () => { },
  addTransaction: async () => { },
  removeCoinTransactions: async () => { },
});

interface PortfolioContext {
  loading: boolean;
  data: Portfolio;
  addFavorite: (id: Coin["id"]) => Promise<void>;
  removeFavorite: (id: Coin["id"]) => Promise<void>;
  addTransaction: (
    coinId: Coin["id"],
    coinPrice: number,
    coinAmount: number,
  ) => Promise<void>;
  removeCoinTransactions: (id: Coin["id"]) => Promise<void>;
}

export default function PortfolioProvider({
  children,
}: React.PropsWithChildren) {
  const [data, setData] = useState<Portfolio>(emptyPortfolio);
  const [loading, setLoading] = useState<boolean>(true);

  async function addFavorite(id: Coin["id"]) {
    if (loading) return;

    setLoading(true);
    setTimeout(() => PortfolioController.addFavorite(id)
      .then((portfolio) => setData(portfolio))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false)));
  }

  async function removeFavorite(id: Coin["id"]) {
    if (loading) return;

    setLoading(true);
    setTimeout(() => PortfolioController.removeFavorite(id)
      .then((portfolio) => setData(portfolio))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
    );
  }

  async function addTransaction(
    coinId: Coin["id"],
    coinPrice: number,
    coinCount: number,
  ) {
    if (loading) return;

    setTimeout(() => PortfolioController.addTransaction(coinId, coinPrice, coinCount)
      .then((portfolio) => {
        setData(portfolio);
        setTimeout(() => {
          alert(
            "Purchase completed! You can check your balance in your portfolio page",
          );
        })
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
    );
  }

  async function removeCoinTransactions(
    coinId: Coin['id']
  ) {
    if (loading) return;

    setTimeout(() => PortfolioController.removeCoinTransactions(coinId)
      .then((portfolio) => {
        setData(portfolio);
        setTimeout(() => {
          alert(
            `The removal of the ${coinId} coin has been carried out!`
          )
        });
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
    );
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
        removeCoinTransactions,
      }}
    >
      {children}
    </Context.Provider>
  );
}
