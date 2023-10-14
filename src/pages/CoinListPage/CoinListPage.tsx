import { useContext, useMemo, useState } from "react";
import { Outlet } from "react-router-dom";

import Coin from "models/Coin";
import { SEARCH_PLACEHOLDER } from "models/Interface";

import CoinTable from "components/CoinTable/CoinTable";
import SearchInput from "components/general/SearchInput/SearchInput";
import TrendingCoins from "components/TrendingCoins/TrendingCoins";
import PortfolioLiteCard from "components/PortfolioLiteCard/PortfolioLiteCard";

import { filterCoinList } from "logic/utils/Helper";

import { Context as CoinsContext } from "providers/coins";

import styles from "pages/CoinListPage/CoinListPage.module.scss";

export default function CoinListPage() {
  const coins = useContext(CoinsContext).data;

  const [searchFilter, setSearchFilter] = useState<string>("");
  const filteredCoinList = useMemo(
    () => filterCoinList(coins, searchFilter),
    [searchFilter, coins],
  );

  const coinTopThree: Coin[] = coins.slice(0, 3);
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <section className={styles.section}>
          <h1>Cryptocoins Info</h1>
          <SearchInput
            value={searchFilter}
            placeholderValue={SEARCH_PLACEHOLDER}
            onChange={setSearchFilter}
          />
        </section>
        <TrendingCoins coinList={coinTopThree} />
        <PortfolioLiteCard />
      </header>
      <section className={styles.body}>
        <CoinTable coinList={filteredCoinList} />
      </section>
      <Outlet />
    </div>
  );
}
