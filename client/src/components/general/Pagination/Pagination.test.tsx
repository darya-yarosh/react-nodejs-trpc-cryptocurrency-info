import { screen, render, act } from "@testing-library/react";

import Pagination from './Pagination';
import userEvent from "@testing-library/user-event";
import TestComponent from "./PaginationTest";

describe('Pagination component module', () => {
    test('Has valid structure of childs', () => {
        render(
            <Pagination
                isLastPage={false}
                currentPageInd={0}
                changePage={() => { }} />
        )

        const paginationComponent = screen.getByTestId('pagination');
        expect(paginationComponent).toContainHTML('nav');
        expect(paginationComponent.hasChildNodes()).toBeTruthy();

        expect(paginationComponent).toContainHTML('button');
        expect(paginationComponent.childNodes[0]).toHaveTextContent('<');
        expect(paginationComponent.childNodes[1]).toHaveTextContent('1');
        expect(paginationComponent.childNodes[2]).toHaveTextContent('>');

    })
    test('Setting a specific page', () => {
        const pageInd = 5;
        render(
            <Pagination
                isLastPage={false}
                currentPageInd={pageInd}
                changePage={() => { }} />
        )

        const paginationComponent = screen.getByTestId('pagination');
        expect(paginationComponent.childNodes[1]).toHaveTextContent(`${pageInd + 1}`);
    });
    test('Navigating through pages and replacing the current page', () => {
        render(
            <TestComponent />
        )

        const prevButton = screen.getByTestId('pagination-prevButton');
        const pageCountText = screen.getByTestId('pagination-pageCountText');
        const nextButton = screen.getByTestId('pagination-nextButton');

        const onClickPrev = () => {
            // eslint-disable-next-line testing-library/no-unnecessary-act
            act(() => {
                userEvent.click(prevButton);
            });
        }
        const onClickNext = () => {
            // eslint-disable-next-line testing-library/no-unnecessary-act
            act(() => {
                userEvent.click(nextButton);
            });
        }

        expect(pageCountText).toHaveTextContent('1');
        onClickPrev();
        expect(pageCountText).toHaveTextContent('1');

        onClickNext();
        expect(pageCountText).toHaveTextContent('2');

        onClickNext();
        expect(pageCountText).toHaveTextContent('3');

        onClickPrev();
        onClickNext();
        expect(pageCountText).toHaveTextContent('3');

        onClickPrev();
        expect(pageCountText).toHaveTextContent('2');
    });
});