import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Coin from "models/Coin";


import Modal from "components/general/Modal/Modal";
import PortfolioCard from "components/PortfolioCard/PortfolioCard";

import coinCapController from "logic/storage/CoinCapController";

import { Context as PortfolioContext } from "providers/portfolio";

export default function PortfolioPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const portfolio = useContext(PortfolioContext).data;

  const [favoriteCoins, setFavoriteCoins] = useState<Coin[]>([]);

  function navigateBack() {
    if (!isLoading) navigate(-1);
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

  return (
    <Modal handleDismiss={navigateBack}>
      <PortfolioCard
        isLoading={isLoading}
        favoriteCoins={favoriteCoins}
        navigateBack={navigateBack} />
    </Modal>
  );
}
