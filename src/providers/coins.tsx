import { createContext, useEffect, useState } from "react";

import Coin from 'models/Coin';

import { coinListLoader } from "logic/loaders/coinList";

export const Context = createContext<CoinsContext>({
    loading: false,
    data: [],
});
type CoinsContext = {
    loading: boolean;
    data: Coin[];
}

export default function CoinsProvider({
    children,
}: React.PropsWithChildren) {
    const [data, setData] = useState<Coin[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(
        () => {
            coinListLoader()
                .then((coins) => {
                    setData(coins);
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