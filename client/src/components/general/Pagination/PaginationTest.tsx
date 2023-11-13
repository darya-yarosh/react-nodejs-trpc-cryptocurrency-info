import { useState } from "react";

import Pagination from './Pagination';

export default function TestComponent() {
    const [pageInd, setPageInd] = useState<number>(0);
    function changePageInd(newPage: number) {
        setPageInd(newPage);
    }

    return (
        <Pagination
            isLastPage={false}
            currentPageInd={pageInd}
            changePage={changePageInd} />
    )
}