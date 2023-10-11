import { useEffect, useMemo, useState } from "react";

import Coin, { CoinTableLabels } from "models/Coin";
import { SortOrder } from "models/Interface";

import { CoinListSortType, sortCoinList } from "logic/utils/Helper";

import styles from "components/CoinTable/CoinTable.module.scss";
import SortIcon from "components/SortIcon/SortIcon";
import IconButton from "components/general/IconButton/IconButton";

interface CoinTableProps {
    coinList: Coin[],
    coinsPerList?: number,
}

const COINS_PER_PAGE = 10;

export default function CoinTable({
    coinList,
    coinsPerList = COINS_PER_PAGE,
}: CoinTableProps) {
    const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.asc);
    const [sortType, setSortType] = useState<CoinListSortType>(CoinListSortType.rank);
    
    const [pageIndex, setPageIndex] = useState<number>(0);
    
    function changeSortType(selectedType: CoinListSortType) {
        setSortType(selectedType);
        if (selectedType === sortType) {
            setSortOrder(currentValue => currentValue === SortOrder.asc
                ? SortOrder.desc
                : SortOrder.asc);
        }
    }

    const sortedCoins = useMemo(
        () => [...sortCoinList(coinList, sortType, sortOrder)],
        [coinList, sortType, sortOrder]
    );

    const currentPageCoins = useMemo(
        () => sortedCoins.slice(coinsPerList * pageIndex, coinsPerList * pageIndex + coinsPerList),
        [sortedCoins, coinsPerList, pageIndex]
    );

    const pageCount = useMemo(
        () => Math.ceil(sortedCoins.length / coinsPerList),
        [coinsPerList, sortedCoins.length]
    );
    const pages = useMemo(
        () => (new Array(pageCount).fill(0)).map((e, i) => Number(i)),
        [pageCount]
    );

    useEffect(() => {
        setPageIndex(0);
    }, [coinList]);

    return <div className={styles.table__wrapper}>
        <table>
            <tbody>
                <tr>
                    <th>
                        <div className={styles.columnName__withSort}>
                            <input
                                id={CoinListSortType.rank}
                                onClick={() => changeSortType(CoinListSortType.rank)}
                            />
                            <label className={styles.columnName__withSort} htmlFor={CoinListSortType.rank}>
                                <span>{CoinTableLabels.rank}</span>
                                <span>
                                    <SortIcon sortType={CoinListSortType.rank}
                                        sortOrder={sortOrder}
                                        isEnabled={true}
                                        isSelected={sortType === CoinListSortType.rank} />
                                </span>
                            </label>
                        </div>
                    </th>
                    <th><p className={styles.columnName}>{CoinTableLabels.symbol}</p></th>
                    <th><p className={styles.columnName}>{CoinTableLabels.logo}</p></th>
                    <th><p className={styles.columnName}>{CoinTableLabels.name}</p></th>
                    <th>
                        <div className={styles.columnName__withSort}>
                            <input id={CoinListSortType.priceUsd}
                                onClick={() => changeSortType(CoinListSortType.priceUsd)}
                            />
                            <label htmlFor={CoinListSortType.priceUsd}>
                                <span>{CoinTableLabels.priceUsd}</span>
                                <span>
                                    <SortIcon sortType={CoinListSortType.priceUsd}
                                        sortOrder={sortOrder}
                                        isEnabled={true}
                                        isSelected={sortType === CoinListSortType.priceUsd} />
                                </span>
                            </label>
                        </div>
                    </th>
                    <th>
                        <div className={styles.columnName__withSort}>
                            <input id={CoinListSortType.marketCapUsd}
                                onClick={() => changeSortType(CoinListSortType.marketCapUsd)}
                            />
                            <label htmlFor={CoinListSortType.marketCapUsd}>
                                <span>{CoinTableLabels.marketCapUsd}</span>
                                <span>
                                    <SortIcon
                                        sortType={CoinListSortType.marketCapUsd}
                                        sortOrder={sortOrder}
                                        isEnabled={true}
                                        isSelected={sortType === CoinListSortType.marketCapUsd} />
                                </span>
                            </label>
                        </div>
                    </th>
                    <th>
                        <div className={styles.columnName__withSort}>
                            <input id={CoinListSortType.changePercent24Hr}
                                onClick={() => changeSortType(CoinListSortType.changePercent24Hr)}
                            />
                            <label htmlFor={CoinListSortType.changePercent24Hr}>
                                <span>{CoinTableLabels.volumeUsd24Hr}</span>
                                <span>
                                    <SortIcon
                                        sortType={CoinListSortType.changePercent24Hr}
                                        sortOrder={sortOrder}
                                        isEnabled={true}
                                        isSelected={sortType === CoinListSortType.changePercent24Hr} />
                                </span>
                            </label>
                        </div>
                    </th>
                    <th>{CoinTableLabels.navigation}</th>
                </tr>
                {currentPageCoins.map((coinInfo: Coin, index) =>
                    <tr key={coinInfo.id} className={styles.note__wrapper}>
                        <td><p>{coinInfo.rank}</p></td>
                        <td><p>{coinInfo.symbol}</p></td>
                        <td><img src={`${coinInfo.logo}`} alt={`${coinInfo.id} icon`} width={"25px"}></img></td>
                        <td><p>{coinInfo.name}</p></td>
                        <td><p>{coinInfo.priceUsd}</p></td>
                        <td><p>{coinInfo.marketCapUsd}</p></td>
                        <td><p>{coinInfo.changePercent24Hr}</p></td>
                        <td><IconButton caption={`Button to adding ${coinInfo.name} in portfolio`} iconSVG={"/images/buttons/plus.svg"} onClick={() => { }} /></td>
                    </tr>
                )}
            </tbody>
        </table>
        <nav className={styles.pagination}>{pages.map(pageNum => {
            const className = pageNum === pageIndex ? styles.pageNum__current : styles.pageNum;
            return <button key={pageNum} className={className} onClick={() => setPageIndex(pageNum)}>{pageNum + 1}</button>
        })}</nav>
    </div>
}