import { useMemo, useState } from "react";
import { useLoaderData } from "react-router-dom";

import Coin from "models/Coin";
import { SEARCH_PLACEHOLDER } from "models/Interface";

import CoinTable from "components/CoinTable/CoinTable";
import SearchInput from "components/general/SearchInput/SearchInput";
import TrendingCoins from "components/TrendingCoins/TrendingCoins";

import { filterCoinList } from "logic/utils/Helper";

import styles from "components/pages/CoinListPage/CoinListPage.module.scss";

export default function CoinListPage() {
  const coinList: Coin[] = useLoaderData() as Coin[];

  const [searchFilter, setSearchFilter] = useState<string>("");
  const filteredCoinList = useMemo(
    () => filterCoinList(coinList, searchFilter),
    [searchFilter, coinList],
  );

  const coinTopThree: Coin[] = coinList.slice(0, 3);
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <TrendingCoins coinList={coinTopThree} />
        <section className={styles.section}>
          <h1>Cryptocoins Info</h1>
          <SearchInput
            value={searchFilter}
            placeholderValue={SEARCH_PLACEHOLDER}
            onChange={setSearchFilter}
          />
        </section>
      </header>
      <CoinTable coinList={filteredCoinList} />
    </div>
  );
}
