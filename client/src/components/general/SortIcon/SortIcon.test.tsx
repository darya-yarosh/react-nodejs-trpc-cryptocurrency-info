import { screen, render } from "@testing-library/react";

import { SortOrder } from "models/Interface";

import SortIcon from "./SortIcon";

describe('Sort Icon component module', () => {
    test('Setting the sort-disabled.svg icon', () => {
        const sortType = 'test'
        const sortOrder = SortOrder.asc;
        const isEnabled = false;
        const isSelected = false;
        const src = `/images/sort/sort-disabled.svg`;

        render(
            <SortIcon
                sortType={sortType}
                sortOrder={sortOrder}
                isEnabled={isEnabled}
                isSelected={isSelected} />
        )

        const sortIconElement = screen.getByTestId('icon');
        expect(sortIconElement).toHaveAttribute('src', src);
    })
    test('Setting the sort-enabled.svg icon', () => {
        const sortType = 'test'
        const sortOrder = SortOrder.desc;
        const isEnabled = true;
        const isSelected = false;
        const src = `/images/sort/sort-enabled.svg`;

        render(
            <SortIcon
                sortType={sortType}
                sortOrder={sortOrder}
                isEnabled={isEnabled}
                isSelected={isSelected} />
        )

        const sortIconElement = screen.getByTestId('icon');
        expect(sortIconElement).toHaveAttribute('src', src);
    })
    test('Setting the sort-desc.svg icon', () => {
        const sortType = 'test'
        const sortOrder = SortOrder.desc;
        const isEnabled = true;
        const isSelected = true;
        const src = `/images/sort/sort-desc.svg`;

        render(
            <SortIcon
                sortType={sortType}
                sortOrder={sortOrder}
                isEnabled={isEnabled}
                isSelected={isSelected} />
        )

        const sortIconElement = screen.getByTestId('icon');
        expect(sortIconElement).toHaveAttribute('src', src);
    })
    test('Setting the sort-asc.svg icon', () => {
        const sortType = 'test'
        const sortOrder = SortOrder.asc;
        const isEnabled = true;
        const isSelected = true;
        const src = `/images/sort/sort-asc.svg`;

        render(
            <SortIcon
                sortType={sortType}
                sortOrder={sortOrder}
                isEnabled={isEnabled}
                isSelected={isSelected} />
        )

        const sortIconElement = screen.getByTestId('icon');
        expect(sortIconElement).toHaveAttribute('src', src);
    })
});