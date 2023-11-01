import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Coin from "models/Coin";
import { CoinWithSummary } from "models/Portfolio";

import Modal from "components/general/Modal/Modal";
import PortfolioCard from "components/PortfolioCard/PortfolioCard";

import coinCapController from "logic/storage/CoinCapController";
import { getCoinsActualPrice, mapTransactionsByCoin } from "logic/utils/PortfolioHelper";

import { Context as PortfolioContext } from "providers/portfolio";

export default function PortfolioPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const portfolio = useContext(PortfolioContext).data;

  const transactionSummaryList = useMemo(
    () => mapTransactionsByCoin(portfolio.transactionList),
    [portfolio.transactionList],
  );
  const [transactionCoins, setTransactionCoins] = useState<CoinWithSummary[]>([]);
  const [favoriteCoins, setFavoriteCoins] = useState<Coin[]>([]);
  const [actualPrice, setActualPrice] = useState<number>(0);

  function navigateBack() {
    if (!isLoading) navigate(-1);
  }

  async function loadTransactionCoins() {
    if (portfolio.transactionList.length === 0) {
      setTransactionCoins([])
      setIsLoading(false);
      return;
    };

    const coinIdList: string[] = transactionSummaryList.map(transaction =>
      transaction.id
    )

    await coinCapController.getCoinList(undefined, coinIdList)
      .then((coinList => {
        const loadedTransactionCoins: CoinWithSummary[] = [];

        transactionSummaryList.forEach(transactionSummary => {
          const coin = coinList.find(coin => coin.id === transactionSummary.id);
          if (coin) {
            const transactionCoin: CoinWithSummary = {
              id: transactionSummary.id,
              amount: transactionSummary.amount,
              moneySpent: transactionSummary.moneySpent,
              name: coin.name,
              logo: coin.logo,
              priceUsd: coin.priceUsd,
            }
            loadedTransactionCoins.push(transactionCoin);
          }
        })
        setTransactionCoins(loadedTransactionCoins);

        const coinPrices = getCoinsActualPrice(coinList, transactionSummaryList);
        const newActualPrice = coinPrices.reduce((total, coin) => total + coin.price, 0);
        setActualPrice(newActualPrice)
      }))
      .finally(() => setIsLoading(false));
  }

  async function loadFavoriteCoins() {
    if (portfolio.favorites.length === 0) {
      setFavoriteCoins([])
      setIsLoading(false);
      return;
    };

    await coinCapController.getCoinList(undefined, portfolio.favorites)
      .then((coinList => {
        setFavoriteCoins(coinList)
      }))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    setIsLoading(true);
    setTimeout(loadFavoriteCoins)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portfolio.favorites])

  useEffect(() => {
    setIsLoading(true);
    setTimeout(loadTransactionCoins);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portfolio.transactionList])

  return (
    <Modal handleDismiss={navigateBack}>
      <PortfolioCard
        isLoading={isLoading}
        actualPrice={actualPrice}
        transactionCoins={transactionCoins}
        favoriteCoins={favoriteCoins}
        navigateBack={navigateBack} />
    </Modal>
  );
}
