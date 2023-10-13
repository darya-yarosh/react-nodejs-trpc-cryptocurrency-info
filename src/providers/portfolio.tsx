import { createContext, useEffect, useState } from "react";

import { Portfolio, emptyPortfolio } from "models/Portfolio";

import { portfolioLoader } from "logic/loaders/portfolio";

export const Context = createContext<PortfolioContext>({
    loading: false,
    data: emptyPortfolio,
});
type PortfolioContext = {
    loading: boolean;
    data: Portfolio;
}

export default function PortfolioProvider({
    children,
}: React.PropsWithChildren) {
    const [data, setData] = useState<Portfolio>(emptyPortfolio);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(
        () => {
            portfolioLoader()
                .then((portfolio) => {
                    setData(portfolio);
                })
                .finally(() => {
                    setLoading(false);
                });
        },
        []
    )
    return (
        <Context.Provider value={{ loading, data }}>
            {children}
        </Context.Provider>
    )
}