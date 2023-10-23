import { useContext, useEffect, useMemo, useState } from "react";
import { Outlet } from "react-router-dom";

import Coin from "models/Coin";
import { APP_NAME, SEARCH_PLACEHOLDER } from "models/Interface";

import CoinTable from "components/CoinTable/CoinTable";
import SearchInput from "components/general/SearchInput/SearchInput";
import TrendingCoins from "components/TrendingCoins/TrendingCoins";
import PortfolioLiteCard from "components/PortfolioLiteCard/PortfolioLiteCard";

import { filterCoinList } from "logic/utils/Helper";
import coinCapController from "logic/storage/CoinCapController";

import { Context as CoinsContext } from "providers/coins";

import styles from "pages/CoinListPage/CoinListPage.module.scss";

export default function CoinListPage() {
  const coins = useContext(CoinsContext).data;

  const [searchFilter, setSearchFilter] = useState<string>("");
  const filteredCoinList = useMemo(
    () => filterCoinList(coins, searchFilter),
    [searchFilter, coins],
  );

  const [coinsTopThree, setCoinsTopThree] = useState<Coin[]>([]);

  useEffect(() => {
    /**
     * The function returns the three most popular coins.
     * Since all coins in the database are sorted by rank,
     * the first three elements are taken.
     * 
     * @returns A list of three popular coins.
     */
    async function getTopThreeTrendingCoins() {
      const trendingList = await coinCapController.getCoinList(0, 3);
      return trendingList;
    };

    getTopThreeTrendingCoins()
      .then((coins) => setCoinsTopThree(coins))
      .catch((error) => console.log("error", error));
  }, [])

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <section className={styles.header__sectionFirst}>
          <h1 className={styles.appName}>{APP_NAME}</h1>
          <SearchInput
            value={searchFilter}
            placeholderValue={SEARCH_PLACEHOLDER}
            onChange={setSearchFilter}
          />
        </section>
        <section className={styles.header__sectionSecond}>
          <TrendingCoins coinList={coinsTopThree} />
          <PortfolioLiteCard />
        </section>
      </header>
      <section className={styles.body}>
        <CoinTable coinList={filteredCoinList} />
      </section>
      <Outlet />
    </div>
  );
}
