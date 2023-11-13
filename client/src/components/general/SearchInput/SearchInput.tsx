import { memo } from 'react';

import searchIcon from 'components/general/SearchInput/search.svg';

import styles from 'components/general/SearchInput/SearchInput.module.scss';

interface SearchInputProps {
	value: string;
	placeholderValue: string;
	onChange: (value: string) => void;
}

function SearchInput({ value, placeholderValue, onChange }: SearchInputProps) {
	return (
		<div className={styles.wrapper} data-testid="search">
			<input
				className={styles.input}
				type="search"
				placeholder={placeholderValue}
				value={value}
				onChange={(event) => onChange(event.target.value)}
			/>
			<img className={styles.icon} src={searchIcon} alt="Search Icon" />
		</div>
	);
}

const MemoSearchInput = memo(SearchInput);
export default MemoSearchInput;
