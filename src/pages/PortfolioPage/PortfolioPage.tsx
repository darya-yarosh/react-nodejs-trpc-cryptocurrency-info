import { useNavigate } from "react-router-dom";

import Modal from "components/general/Modal/Modal";
import PortfolioCard from "components/PortfolioCard/PortfolioCard";

export default function PortfolioPage() {
    const navigate = useNavigate();

    return (
        <Modal handleDismiss={() => navigate(-1)}>
            <PortfolioCard />
        </Modal>
    );
}
