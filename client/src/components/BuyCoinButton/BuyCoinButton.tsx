import { useNavigate } from 'react-router-dom';

import Coin from 'models/Coin';

import Button from 'components/general/Button/Button';

interface BuyCoinButtonProps {
	className?: string;
	coinId: Coin['id'];
}

export default function BuyCoinButton({
	className = '',
	coinId,
}: BuyCoinButtonProps) {
	const navigate = useNavigate();

	function navigateToBuy() {
		navigate('/purchase/' + coinId);
	}

	return (
		<Button
			key={coinId}
			className={className}
			label="Buy"
			onClick={navigateToBuy}
		/>
	);
}
