import { memo, useEffect, useState } from 'react';

import { useDebounce } from 'logic/utils/useDebounce';

import styles from 'components/general/SelectWithSearch/SelectWithSearch.module.scss';

interface SelectWithSearchProps {
	value: string;
	placeholderValue: string;
	onSearchChange: (value: string) => void;
	list: string[];
}

function SelectWithSearch({
	value,
	placeholderValue,
	list,
	onSearchChange,
}: SelectWithSearchProps) {
	const [searchValue, setSearchValue] = useState<string>(value);
	const [isFocusInput, setIsFocusInput] = useState<boolean>(false);

	const reloadList = useDebounce((value) => onSearchChange(value), 300);

	const SEARCH_ID = 'searchId';

	const selectClassName = isFocusInput
		? styles.optionList__visible
		: styles.optionList__hidden;

	function changeSearchValue(value: string) {
		setSearchValue(value);

		reloadList(value);
	}

	function setOption(value: string) {
		setSearchValue(value);
		setIsFocusInput(false);

		reloadList(value);
	}

	function handleInputFocus(
		event: React.FocusEvent<HTMLInputElement, Element>
	) {
		if (event.currentTarget.id === SEARCH_ID) {
			setIsFocusInput(true);
		}
	}

	useEffect(() => {
		setSearchValue(value);
	}, [value]);

	return (
		<div className={styles.wrapper} data-testid={'selectWithSearch'}>
			<input
				className={styles.input}
				id={SEARCH_ID}
				value={searchValue}
				placeholder={placeholderValue}
				onChange={(event) => changeSearchValue(event.target.value)}
				onFocus={(event) => handleInputFocus(event)}
			/>
			<div className={selectClassName}>
				{list.map((option) => (
					<button
						key={option}
						type="button"
						className={styles.option}
						onClick={() => setOption(option)}
					>
						{option}
					</button>
				))}
			</div>
		</div>
	);
}

const MemoSelectWithSearch = memo(SelectWithSearch);
export default MemoSelectWithSearch;
