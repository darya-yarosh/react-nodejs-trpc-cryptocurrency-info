import searchIcon from "components/general/SearchInput/search.svg";

import styles from "components/general/SearchInput/SearchInput.module.scss";

interface SearchInputProps {
    value: string;
    placeholderValue: string;
    onChange: (value: string) => void;
}

export default function SearchInput({
    value,
    placeholderValue,
    onChange,
}: SearchInputProps) {
    return <div className={styles.wrapper}>
        <input type="search"
            placeholder={placeholderValue}
            value={value}
            onChange={(event) => onChange(event.target.value)} />
        <img
            className={styles.icon}
            src={searchIcon}
            alt="Search Icon"
        />
    </div>
}