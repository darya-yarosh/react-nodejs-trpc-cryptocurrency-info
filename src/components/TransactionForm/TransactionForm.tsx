import { useContext, useEffect, useMemo, useState } from "react";

import Coin from "models/Coin";

import Button from "components/general/Button/Button";
import Select from "components/general/Select/Select";
import IconButton from "components/general/IconButton/IconButton";

import { formatPrice, priceToNumber, supplyToNumber } from "logic/utils/Helper";

import { Context as CoinsContext } from "providers/coins";

import styles from "components/TransactionForm/TransactionForm.module.scss";

interface TransactionFormProps {
  defaultCoinId?: Coin["id"];
  navigateBack: ()=>void;
  submit: (
    selectedCoinId: Coin['id'],
    priceUsd: Coin['priceUsd'],
    quantity: number
  ) => void;
}

export default function TransactionForm({
  defaultCoinId,
  navigateBack,
  submit,
}: TransactionFormProps) {

  const { data: coins } = useContext(CoinsContext);

  const defaultCoin = coins.find((c) => c.id === defaultCoinId);

  const [selectedCoinName, setSelectedCoinName] = useState<Coin["name"]>(
    defaultCoin ? defaultCoin.name : (coins[0] || {}).name,
  );
  const [quantity, setQuantity] = useState<number>(1);

  function handleQuantityChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuantity(Number(event.target.value));
  }

  function handleSubmit(event: React.MouseEvent) {
    event.preventDefault();

    if (!selectedCoin) return;

    submit(selectedCoin.id, selectedCoin.priceUsd, quantity);
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
      quantity > 0 &&
      selectedCoin &&
      quantity <= (supplyToNumber(selectedCoin?.maxSupply, selectedCoin?.symbol) ?? Infinity),
    [quantity, selectedCoin],
  );

  return (
    <form className={styles.wrapper}>
      <header className={styles.header}>
        <IconButton
          iconSVG="/images/buttons/return.svg"
          caption="Go back"
          onClick={navigateBack}
        />
        <h1 className={styles.title}>Add transaction</h1>
      </header>
      <section className={styles.section}>
        <label>Coin</label>
        <Select
          name="coin"
          options={coins.map((c) => c.name)}
          selectedOption={selectedCoinName}
          onChange={setSelectedCoinName}
        />
      </section>
      <section className={styles.section}>
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
          min={1}
          onChange={handleQuantityChange}
        />
      </section>
      <section className={styles.section}>
        <label>Price per coin</label>
        <span className={styles.price}>{selectedCoin?.priceUsd}</span>
      </section>
      <section className={styles.section}>
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
