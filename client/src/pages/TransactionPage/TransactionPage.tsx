import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Coin from "models/Coin";

import Modal from "components/general/Modal/Modal";
import TransactionForm from "components/TransactionForm/TransactionForm";

import { priceToNumber } from "logic/utils/Helper";
import coinCapController from "logic/storage/CoinCapController";

import { Context as CoinsContext } from "providers/coins";
import { Context as PortfolioContext } from "providers/portfolio";

export default function TransactionPage() {
  const navigate = useNavigate();
  const params = useParams();

  const { data: contextCoins } = useContext(CoinsContext);
  const { addTransaction } = useContext(PortfolioContext);

  const [selectedCoin, setSelectedCoin] = useState<Coin>();
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [coins, setCoins] = useState<Coin[]>([])

  function navigateBack() {
    navigate(-1);
  }

  function submit(
    selectedCoinId: Coin['id'],
    priceUsd: Coin['priceUsd'],
    quantity: number
  ) {
    addTransaction(
      selectedCoinId,
      priceToNumber(priceUsd),
      quantity,
    );
    navigateBack();
  }

  async function changeSearchFilter(value: string) {
    if (value === "") {
      setCoins(contextCoins);
      return;
    }

    setSearchFilter(value);
    loadCoinsByFilter(value);
  }

  async function loadCoinsByFilter(filter: string) {
    await coinCapController.getCoinList(filter)
      .then((loadedCoins) => {
        setCoins(loadedCoins)
      })
      .catch((error) => {
        console.log("error", error)
      });
  }

  useEffect(() => {
    if (params.id !== undefined) {
      coinCapController.getCoinById(params.id)
        .then(coin => {
          setSearchFilter(coin.name);
          setSelectedCoin(coin);
        })
        .catch((error) => console.log("error", error));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Modal handleDismiss={navigateBack}>
      {selectedCoin !== undefined &&
        <TransactionForm
          coins={coins}
          selectedCoin={selectedCoin}
          searchCoinName={searchFilter}
          onChangeSearchFilter={changeSearchFilter}
          navigateBack={navigateBack}
          submit={submit}
        />}
    </Modal>
  );
}
