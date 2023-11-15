import { screen, render } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import SearchInput from "./SearchInput";

describe('Search Input component module', () => {
    test('Change value', async () => {
        let searchValue = 'Search now';

        function onChange(newValue: string) {
            searchValue = newValue;
        }

        render(<SearchInput
            value={""}
            placeholderValue={"Search..."}
            onChange={onChange} />)

        expect(searchValue).toBe('Search now');
        await userEvent.clear(screen.getByPlaceholderText('Search...'))
        await userEvent.click(screen.getByPlaceholderText('Search...'));
        await userEvent.keyboard('!');
        expect(searchValue).toBe('!');
    })
});