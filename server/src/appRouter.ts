import { initTRPC } from '@trpc/server';
import Coin, { StorageCoin } from './models/Coin';
import {
  formatSupply,
  formatMarketCap,
  formatVolumeUsd24Hr,
  formatPrice,
  formatPercent
} from './logic/helper';

const API = "https://api.coincap.io/v2";

const trpc = initTRPC.create();

const appRouter = trpc.router({
  getCoinList: trpc.procedure
    .input(
      (value): getCoinListInput => {
        if (typeof value === 'object'
          && value !== null
          && (value as object).hasOwnProperty('search')
          && (value as object).hasOwnProperty('ids')
          && (value as object).hasOwnProperty('offset')
          && (value as object).hasOwnProperty('limit')) {
          return value;
        }
        throw new Error('Input is not a valid object.');
      })
    .query(async (opts) => {
      const { input } = opts;

      const requestOptions: RequestInit = {
        mode: 'no-cors',
        method: "GET",
        redirect: "follow",
      };

      let url = API + "/assets?";
      if (input.search !== undefined) {
        url += `search=${input.search}&`;
      }
      if (input.ids !== undefined) {
        url += `ids=${input.ids.join()}&`;
      }
      if (input.offset !== undefined && input.limit !== undefined) {
        url += `offset=${input.offset}&limit=${input.limit}&`
      };

      const apiUrl = await fetch(url, requestOptions);
      const dataInfo = await apiUrl.json();

      const coinList: Coin[] = dataInfo.data.map((storageCoin: StorageCoin) => {
        const maxSupply = storageCoin.maxSupply === null ? Infinity : storageCoin.maxSupply;

        const coin: Coin = {
          id: storageCoin.id,
          rank: Number(storageCoin.rank),
          symbol: storageCoin.symbol,
          name: storageCoin.name,
          supply: formatSupply(storageCoin.supply, storageCoin.symbol),
          maxSupply: formatSupply(maxSupply, storageCoin.symbol),
          marketCapUsd: formatMarketCap(storageCoin.marketCapUsd),
          volumeUsd24Hr: formatVolumeUsd24Hr(storageCoin.volumeUsd24Hr),
          priceUsd: formatPrice(storageCoin.priceUsd),
          changePercent24Hr: formatPercent(storageCoin.changePercent24Hr),
          vwap24Hr: storageCoin.vwap24Hr,
          logo: `images/coins/${storageCoin.symbol.toLowerCase()}.svg`,
        };

        return coin;
      });
      return coinList;
    })
})

interface getCoinListInput {
  search?: string,
  ids?: string[],
  offset?: number,
  limit?: number
}

export type AppRouter = typeof appRouter;
export default appRouter;