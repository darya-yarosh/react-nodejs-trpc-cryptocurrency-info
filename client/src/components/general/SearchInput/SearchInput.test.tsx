import { screen, render, act } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import SearchInput from "./SearchInput";

describe('Search Input component module', () => {
    afterEach(() => {
        jest.useRealTimers();
    });

    test('Change value', () => {
        jest.useFakeTimers();

        let searchValue = 'Search now';

        function onChange(newValue: string) {
            searchValue = newValue;
        }

        render(<SearchInput
            value={""}
            placeholderValue={"Search..."}
            onChange={onChange} />)

        const changeValue = (symbol: string) => {
            // eslint-disable-next-line testing-library/no-unnecessary-act
            act(() => {
                userEvent.clear(screen.getByPlaceholderText('Search...'))
                userEvent.click(screen.getByPlaceholderText('Search...'));
                userEvent.keyboard(symbol);
            });
        }

        expect(searchValue).toBe('Search now');
        changeValue('!');
        expect(searchValue).toBe('!');
    })
});