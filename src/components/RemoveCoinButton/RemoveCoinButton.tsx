import Coin from "models/Coin";

import Button from "components/general/Button/Button";

interface RemoveCoinButtonProps {
    className?: string;
    coinId: Coin["id"];
    confirmMessage?: string;
    label?: string;
    onClick: (coinId: Coin["id"]) => void;
}

export default function RemoveCoinButton({
    className = "",
    coinId,
    onClick,
    label = "",
    confirmMessage = ""
}:RemoveCoinButtonProps) {
    function handleClick() {
        const isConfirm = confirmMessage.length > 0 
            ? window.confirm(confirmMessage)
            : true
        if (isConfirm) {
            onClick(coinId);
        }
      }
    
    return <Button className={className} label={label} onClick={handleClick} />;
}