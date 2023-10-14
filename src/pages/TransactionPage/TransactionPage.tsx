import { useNavigate, useParams } from "react-router-dom";

import Modal from "components/general/Modal/Modal";
import TransactionForm from "components/TransactionForm/TransactionForm";

export default function TransactionPage() {
    const navigate = useNavigate();
    const params = useParams();

    function navigateBack() {
        navigate(-1);
    }

    return (
        <Modal handleDismiss={navigateBack}>
            <TransactionForm defaultCoinId={params.id} />
        </Modal>
    )
}