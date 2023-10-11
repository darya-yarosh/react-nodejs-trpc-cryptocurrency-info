import { useEffect, useMemo, useState } from "react";

import Coin from "models/Coin";
import { SortOrder } from "models/Interface";
import { CoinTableLabels } from 'models/CoinTable';

import { CoinListSortType, getAscSortedCoinList, getDescSortedCoinList } from "logic/utils/Helper";

import styles from "components/CoinTable/CoinTable.module.scss";
import SortIcon from "components/SortIcon/SortIcon";
import IconButton from "components/general/IconButton/IconButton";

interface CoinTableProps {
    coinList: Coin[]
}

export default function CoinTable({
    coinList
}: CoinTableProps) {
    const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.asc);
    const [sortType, setSortType] = useState<CoinListSortType>(CoinListSortType.rank)
    const sortedList = useMemo(() => getSortedList(sortType), [sortOrder, coinList]);

    const COINS_ON_PAGE = 10;

    const [currentPageInd, setCurrentPageInd] = useState<number>(0);
    const currentPageCoinList = useMemo(() => sortedList.slice(COINS_ON_PAGE * currentPageInd, COINS_ON_PAGE * currentPageInd + COINS_ON_PAGE), [sortedList, currentPageInd]);

    const pageListCount = useMemo(() => Math.ceil(sortedList.length / COINS_ON_PAGE), [sortedList]);
    const pageList = useMemo(() => (new Array(pageListCount).fill(0)).map((e, i) => Number(i)), [pageListCount]);

    function getSortedList(selectedSortType: CoinListSortType) {
        const newSortedList = sortOrder === SortOrder.desc
            ? getDescSortedCoinList([...coinList], selectedSortType)
            : getAscSortedCoinList([...coinList], selectedSortType);
        return newSortedList
    }

    function handlerUpdateSortType(selectedType: CoinListSortType) {
        setSortType(selectedType);
        setSortOrder(currentValue => currentValue === SortOrder.asc
            ? SortOrder.desc
            : SortOrder.asc);
    }

    useEffect(() => {
        setCurrentPageInd(0);
    }, [coinList]);

    return <div className={styles.table__wrapper}>
        <table>
            <tbody>
                <tr>
                    <th>
                        <div className={styles.columnName__withSort}>
                            <input id={CoinListSortType.rank}
                                onClick={() => handlerUpdateSortType(CoinListSortType.rank)}
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
                                onClick={() => handlerUpdateSortType(CoinListSortType.priceUsd)}
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
                                onClick={() => handlerUpdateSortType(CoinListSortType.marketCapUsd)}
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
                                onClick={() => handlerUpdateSortType(CoinListSortType.changePercent24Hr)}
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
                {currentPageCoinList.map((coinInfo: Coin, index) =>
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
        <nav className={styles.pagination}>{pageList.map(pageNum => {
            const className = pageNum === currentPageInd ? styles.pageNum__current : styles.pageNum;
            return <button key={pageNum} className={className} onClick={() => setCurrentPageInd(pageNum)}>{pageNum + 1}</button>
        })}</nav>
    </div>
}