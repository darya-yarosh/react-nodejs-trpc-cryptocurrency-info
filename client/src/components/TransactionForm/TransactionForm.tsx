import { useMemo, useState } from 'react';

import Coin from 'models/Coin';

import Button from 'components/general/Button/Button';
import IconButton from 'components/general/IconButton/IconButton';
import SelectWithSearch from 'components/general/SelectWithSearch/SelectWithSearch';

import {
	formatPrice,
	formatSupply,
	priceToNumber,
	supplyToNumber,
} from 'logic/utils/Helper';

import styles from 'components/TransactionForm/TransactionForm.module.scss';

interface TransactionFormProps {
	coins: Coin[];
	searchCoinName: string;
	selectedCoin?: Coin;
	onChangeSearchFilter: (newFilter: string) => void;
	navigateBack: () => void;
	submit: (
		selectedCoinId: Coin['id'],
		priceUsd: Coin['priceUsd'],
		quantity: number
	) => void;
}

export default function TransactionForm({
	coins,
	searchCoinName,
	selectedCoin,
	onChangeSearchFilter,
	navigateBack,
	submit,
}: TransactionFormProps) {
	const [quantity, setQuantity] = useState<number>(1);

	const coinsNameList: string[] = useMemo(
		() => coins.map((coin) => coin.name),
		[coins]
	);

	const totalPrice = useMemo(
		() => priceToNumber(selectedCoin?.priceUsd || '') * quantity,
		[quantity, selectedCoin?.priceUsd]
	);

	const supply = selectedCoin
		? supplyToNumber(selectedCoin.supply, selectedCoin.symbol)
		: Infinity;

	const isValid = useMemo(
		() => selectedCoin && quantity > 0 && quantity <= supply,
		[quantity, selectedCoin, supply]
	);

	const buttonTitle = !(quantity > 0 && quantity <= supply)
		? `The quantity must be greater than 0 and less than ${formatSupply(
			supply,
			selectedCoin?.symbol || ''
		)} (total quantity of asset issued).`
		: selectedCoin === undefined
			? `Please select a coin from the list.`
			: `Buy ${selectedCoin.name
			} in the amount of ${quantity} coins for ${formatPrice(
				totalPrice
			)} (worth ${selectedCoin.priceUsd} each).`;

	const handleSubmit = useMemo(
		() => (event: React.MouseEvent) => {
			event.preventDefault();

			if (!selectedCoin) return;

			submit(selectedCoin.id, selectedCoin.priceUsd, quantity);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[isValid]
	);

	function handleQuantityChange(event: React.ChangeEvent<HTMLInputElement>) {
		setQuantity(Number(event.target.value));
	}

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
				<SelectWithSearch
					value={searchCoinName}
					placeholderValue={'Search cryptocyrrency...'}
					list={coinsNameList}
					onSearchChange={onChangeSearchFilter}
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
						selectedCoin?.supply !== null
							? selectedCoin?.supply
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
				<span>{totalPrice ? formatPrice(totalPrice) : '-'}</span>
			</section>
			<Button
				disabled={!isValid}
				title={buttonTitle}
				type="submit"
				label="Buy"
				onClick={handleSubmit}
			/>
		</form>
	);
}
