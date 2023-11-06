import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTRPCReact } from "@trpc/react-query";

import Coin from "models/Coin";

import Modal from "components/general/Modal/Modal";
import TransactionForm from "components/TransactionForm/TransactionForm";

import { priceToNumber } from "logic/utils/Helper";

import { Context as PortfolioContext } from "providers/portfolio";

import { AppRouter } from "../../../../server/src/appRouter"

const trpc = createTRPCReact<AppRouter>();

export default function TransactionPage() {
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
  const navigate = useNavigate();
  const params = useParams();

  const { addTransaction } = useContext(PortfolioContext);

  const [selectedCoinId, setSelectedCoinId] = useState<Coin['id']>(params.id || "");
  const selectedCoin = trpc.getCoinById.useQuery(selectedCoinId).data;

  const [searchFilter, setSearchFilter] = useState<string>("");

  const defaultCoins = trpc.getCoinList.useQuery({
    search: null,
    ids: null,
    offset: null,
    limit: null
  }).data;

  const coins = trpc.getCoinList.useQuery({
    search: searchFilter,
    ids: null,
    offset: null,
    limit: null
  }).data || defaultCoins || [];

  const navigateBack = useMemo(() => () => {
    navigate(-1);
  }, [navigate]);

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

  const changeSearchFilter = useMemo(() => (value: string) => {
   setSearchFilter(value);
  }, []);

  useEffect(() => {
    if (isFirstLoad) {
      return;
    }

    function updateCoinId() {
      const id = (
        coins !== undefined
        && coins.length > 0
        && coins !== defaultCoins
      ) ? coins[0].id
        : "";

      setSelectedCoinId(id)
    };

    updateCoinId()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coins]);

  useEffect(() => {
    if (isFirstLoad) {
      if (selectedCoin !== undefined && selectedCoin.id === params.id) {
        setIsFirstLoad(false);
        setSearchFilter(selectedCoin.name);
      }
    }
  }, [isFirstLoad, params.id, selectedCoin])

  return (
    <Modal handleDismiss={navigateBack}>
      <TransactionForm
        coins={coins || []}
        selectedCoin={selectedCoin}
        searchCoinName={searchFilter}
        onChangeSearchFilter={changeSearchFilter}
        navigateBack={navigateBack}
        submit={submit}
      />
    </Modal>
  );
}
