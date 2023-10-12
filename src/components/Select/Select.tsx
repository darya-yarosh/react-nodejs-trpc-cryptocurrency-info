import styles from "components/Select/Select.module.scss";

interface SelectProps {
  label?: string;
  selectList: string[];
  selectedOption?: string;
  onChange: (option: string) => void;
}

export default function Select({
  label,
  selectList,
  selectedOption = selectList[0],
  onChange,
}: SelectProps) {
  return (
    <div className={styles.wrapper}>
      {label && <p>{label}</p>}
      <select value={selectedOption} onChange={(e) => onChange(e.target.value)}>
        {selectList.map((selectOption, index) => (
          <option key={index} value={selectOption}>
            {selectOption}
          </option>
        ))}
      </select>
    </div>
  );
}
