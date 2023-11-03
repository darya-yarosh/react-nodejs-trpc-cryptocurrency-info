import { initTRPC } from '@trpc/server';
import Coin, { StorageCoin } from './models/Coin';
import {
  formatSupply,
  formatMarketCap,
  formatVolumeUsd24Hr,
  formatPrice,
  formatPercent
} from './logic/helper';

type getCoinListInput = {
  search: string | null,
  ids: string[] | null,
  offset: number | null,
  limit: number | null
}

const API = "https://api.coincap.io/v2";

const trpc = initTRPC.create();

const appRouter = trpc.router({
  getCoinList: trpc.procedure
    .input(
      (value): getCoinListInput => {
        const valueAsType = value as getCoinListInput;

        const isValidObject = value !== null
          && typeof value === 'object';

        const isValidSearch = value?.hasOwnProperty('search')
          && (
            valueAsType.search === null
            || typeof valueAsType.search === 'string'
          );

        const isValidIds = value?.hasOwnProperty('ids')
          && (
            typeof valueAsType.ids === null
            || typeof valueAsType.ids === 'object'
          );

        const isValidOffset = value?.hasOwnProperty('offset')
          && (
            valueAsType.offset === null
            || typeof valueAsType.offset === 'number'
          );

        const isValidLimit = value?.hasOwnProperty('limit')
          && (
            valueAsType.limit === null
            || typeof valueAsType.limit === 'number'
          );

        if (isValidObject
          && isValidSearch
          && isValidIds
          && isValidOffset
          && isValidLimit) {
          return value as getCoinListInput;
        }

        throw new Error('Error[getCoinList]: Input is not a valid object.');
      })
    .query(async (opts) => {
      const { input } = opts;

      const requestOptions: RequestInit = {
        method: "GET",
        redirect: "follow",
      };

      let url = API + "/assets?";
      if (input.search !== null) {
        url += `search=${input.search}&`;
      }
      if (input.ids !== null) {
        url += `ids=${input.ids.join()}&`;
      }
      if (input.offset !== null && input.limit !== null) {
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
    }),
})

export type AppRouter = typeof appRouter;
export default appRouter;