import { useState } from "react";
import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AppRouter } from "../../server/src/appRouter";

const trpc = createTRPCReact<AppRouter>();

export default function App() {
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: 'http://localhost:4000/trpc',
                }),
            ],
        }),
    );

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <TestPage />
            </QueryClientProvider>
        </trpc.Provider>
    );
}

export function TestPage() {
    const coinList = trpc.getCoinList.useQuery({
        search: null,
        ids: null,
        offset: 0,
        limit: 10,
    });

    console.log("Getting coins from server:", coinList.data);

    if (!coinList.data) return <div>Loading...</div>;
    return (
        <div style={{display: 'none'}}>
            {coinList.data.map(coin =>
                <p key={coin.id}>{coin.id}</p>)}
        </div>
    );
}