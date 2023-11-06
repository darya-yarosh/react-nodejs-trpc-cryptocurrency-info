import styles from 'components/general/Select/Select.module.scss';

interface SelectProps {
	label?: string;
	name: string;
	options: string[];
	selectedOption?: string;
	onChange: (option: string) => void;
}

export default function Select({
	label,
	name,
	options,
	selectedOption = options[0],
	onChange,
}: SelectProps) {
	return (
		<div className={styles.wrapper}>
			{label && <p>{label}</p>}
			<select
				className={styles.select}
				name={name}
				value={selectedOption}
				onChange={(e) => onChange(e.target.value)}
			>
				{options.map((selectOption, index) => (
					<option key={index} value={selectOption}>
						{selectOption}
					</option>
				))}
			</select>
		</div>
	);
}
