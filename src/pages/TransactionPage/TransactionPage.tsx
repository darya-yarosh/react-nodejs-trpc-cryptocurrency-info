import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Coin from "models/Coin";

import Modal from "components/general/Modal/Modal";
import TransactionForm from "components/TransactionForm/TransactionForm";

import { priceToNumber } from "logic/utils/Helper";

import { Context as PortfolioContext } from "providers/portfolio";

export default function TransactionPage() {
  const navigate = useNavigate();
  const params = useParams();

  const { addTransaction } = useContext(PortfolioContext);

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

  return (
    <Modal handleDismiss={navigateBack}>
      <TransactionForm
        defaultCoinId={params.id}
        navigateBack={navigateBack}
        submit={submit}
      />
    </Modal>
  );
}
