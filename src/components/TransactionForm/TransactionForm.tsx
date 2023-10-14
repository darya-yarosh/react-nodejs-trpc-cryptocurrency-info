import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Coin from "models/Coin";

import Button from "components/general/Button/Button";
import Select from "components/general/Select/Select";
import IconButton from "components/general/IconButton/IconButton";

import { formatPrice, priceToNumber } from "logic/utils/Helper";

import { Context as CoinsContext } from "providers/coins";
import { Context as PortfolioContext } from "providers/portfolio";

import styles from "components/TransactionForm/TransactionForm.module.scss";

interface TransactionFormProps {
  defaultCoinId?: Coin["id"];
}

export default function TransactionForm({
  defaultCoinId,
}: TransactionFormProps) {
  const navigate = useNavigate();

  const { data: coins } = useContext(CoinsContext);
  const { addTransaction } = useContext(PortfolioContext);

  const defaultCoin = coins.find((c) => c.id === defaultCoinId);

  const [selectedCoinName, setSelectedCoinName] = useState<Coin["name"]>(
    defaultCoin ? defaultCoin.name : (coins[0] || {}).name,
  );
  const [quantity, setQuantity] = useState<number>(0);

  function navigateBack() {
    navigate(-1);
  }

  function handleQuantityChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuantity(Number(event.target.value));
  }

  function handleSubmit(event: React.MouseEvent) {
    event.preventDefault();

    if (!selectedCoin) return;

    addTransaction(
      selectedCoin.id,
      priceToNumber(selectedCoin.priceUsd),
      quantity,
    );
    navigateBack();
  }

  useEffect(
    () => {
      if (defaultCoin) {
        const defaultCoin = coins.find((c) => c.id === defaultCoinId);
        if (defaultCoin) {
          setSelectedCoinName(defaultCoin.name);
        }
      } else {
        setSelectedCoinName((coins[0] || {}).name);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [coins],
  );

  const selectedCoin = useMemo(
    () => coins.find((c) => c.name === selectedCoinName),
    [coins, selectedCoinName],
  );

  const totalPrice = useMemo(
    () => priceToNumber(selectedCoin?.priceUsd || "") * quantity,
    [quantity, selectedCoin?.priceUsd],
  );

  const isValid = useMemo(
    () =>
      quantity >= 0 &&
      selectedCoin &&
      quantity <= (selectedCoin?.maxSupply ?? Infinity),
    [quantity, selectedCoin],
  );

  return (
    <form className={styles.wrapper}>
      <header>
        <IconButton
          iconSVG="/images/buttons/return.svg"
          caption="Go back"
          onClick={navigateBack}
        />
        <h1>Add transaction</h1>
      </header>
      <section>
        <label>Coin</label>
        <Select
          name="coin"
          options={coins.map((c) => c.name)}
          selectedOption={selectedCoinName}
          onChange={setSelectedCoinName}
        />
      </section>
      <section>
        <label>Quantity</label>
        <input
          name="quantity"
          value={quantity}
          type="number"
          required
          max={
            selectedCoin?.maxSupply !== null
              ? selectedCoin?.maxSupply
              : undefined
          }
          min={0}
          onChange={handleQuantityChange}
        />
      </section>
      <section>
        <label>Price per coin</label>
        <span>{selectedCoin?.priceUsd}</span>
      </section>
      <section>
        <label>Total price</label>
        <span>{totalPrice ? formatPrice(totalPrice) : "-"}</span>
      </section>
      <Button
        disabled={!isValid}
        type="submit"
        label="Buy"
        onClick={handleSubmit}
      />
    </form>
  );
}
