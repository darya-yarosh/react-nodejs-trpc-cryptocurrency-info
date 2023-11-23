import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useMemo, useState } from 'react';

import Pagination, { PaginationProps } from './Pagination';

import 'components/general/Pagination/Pagination.module.scss';
import 'App.scss'

function PaginationWrapper({
    isLastPage,
    currentPageInd,
    changePage,
}: PaginationProps) {
    const [pageInd, setCurrentPageInd] = useState<number>(currentPageInd);

    const maxPageInd = useMemo(
        () => isLastPage
            ? pageInd
            : Infinity
        , [isLastPage, pageInd]
    );

    function changeCurrentPageInd(newPageIndex: number) {
        if (newPageIndex >= 0
            && newPageIndex <= maxPageInd) {
            setCurrentPageInd(newPageIndex);
        }
    }

    useEffect(() => {
        if (currentPageInd >= 0) {
            setCurrentPageInd(currentPageInd)
        } else {
            setCurrentPageInd(0)
        }
    }, [currentPageInd])

    return <div style={{ backgroundColor: 'var(--color-bg)' }}>
        <Pagination
            isLastPage={pageInd >= maxPageInd}
            currentPageInd={pageInd}
            changePage={changeCurrentPageInd} />
    </div>
}

const meta: Meta = {
    title: 'General/Pagination',
    component: PaginationWrapper,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        changeType: { action: "onClick" },
    },
}

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
    args: {
        isLastPage: false,
        currentPageInd: 0,
        changePage: (newPageInd: number) => { 
            console.log('Current page: ', newPageInd+1)
        },
    },
}