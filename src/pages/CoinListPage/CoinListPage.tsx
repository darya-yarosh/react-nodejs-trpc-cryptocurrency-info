import { useEffect, useMemo, useState } from "react";
import { Outlet } from "react-router-dom";

import Coin from "models/Coin";
import { APP_NAME, SEARCH_PLACEHOLDER } from "models/Interface";

import CoinTable from "components/CoinTable/CoinTable";
import Pagination from "components/general/Pagination/Pagination";
import SearchInput from "components/general/SearchInput/SearchInput";
import TrendingCoins from "components/TrendingCoins/TrendingCoins";
import PortfolioLiteCard from "components/PortfolioLiteCard/PortfolioLiteCard";

import coinCapController from "logic/storage/CoinCapController";

import styles from "pages/CoinListPage/CoinListPage.module.scss";

export default function CoinListPage() {
  const [coinsTopThree, setCoinsTopThree] = useState<Coin[]>([]);
  const [coins, setCoins] = useState<Coin[]>([])
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [searchFilter, setSearchFilter] = useState<string>("");

  const COINS_PER_PAGE = 10;
  const PAGES_LIMIT = useMemo(() => coins.length / COINS_PER_PAGE, [coins]);
  const isLastPage = useMemo(() => PAGES_LIMIT < 1, [PAGES_LIMIT]);

  useEffect(() => {
    setPageIndex(0);
  }, [searchFilter])

  useEffect(() => {
    async function loadCoinOfPage(pageInd: number) {

      const filter = searchFilter === "" ? undefined : searchFilter;
      await coinCapController.getCoinList(filter, pageInd * COINS_PER_PAGE, COINS_PER_PAGE).then((loadedCoins) => {
        setCoins(loadedCoins);
      });
    }

    loadCoinOfPage(pageIndex)
  }, [pageIndex, searchFilter]);

  useEffect(() => {
    /**
     * The function returns the three most popular coins.
     * Since all coins in the database are sorted by rank,
     * the first three elements are taken.
     * 
     * @returns A list of three popular coins.
     */
    async function getTopThreeTrendingCoins() {
      const trendingList = await coinCapController.getCoinList(undefined, 0, 3);
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
        <CoinTable coinList={coins} />
        <Pagination
          isLastPage={isLastPage}
          currentPageInd={pageIndex}
          changePage={setPageIndex}
        />
      </section>
      <Outlet />
    </div>
  );
}
