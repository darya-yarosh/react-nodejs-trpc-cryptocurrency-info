import { screen, render, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SelectWithSearch from "./SelectWithSearch";

describe('Select With Search component module', () => {
    afterEach(() => {
        jest.useRealTimers();
    });

    test('Select a new value from list', () => {
        jest.useFakeTimers();

        let searchValue = 'Search now';

        function onChange(newValue: string) {
            searchValue = newValue;
        }

        render(<SelectWithSearch
            value={""}
            placeholderValue=""
            onSearchChange={onChange}
            list={[]}
        />)

        const selectWithSearchElement = screen.getByTestId('selectWithSearch');
        const incrementAndPassTime = (passedTime: number) => {
            act(() => {
                jest.advanceTimersByTime(passedTime);
            });
        };

        const changeValue = () => {
            act(() => {
                // eslint-disable-next-line testing-library/no-node-access
                if (selectWithSearchElement.firstElementChild !== null) {
                    // eslint-disable-next-line testing-library/no-node-access
                    userEvent.click(selectWithSearchElement.firstElementChild);
                    userEvent.keyboard('Hello world');
                }
            });
        }

        expect(searchValue).toBe('Search now');
        // Debounce call with 300 delay.
        changeValue()
        incrementAndPassTime(100);
        // Debounce in useEffect hasn't started yet
        expect(searchValue).toBe('Search now');

        incrementAndPassTime(200);
        // Debounce in useEffect has started
        expect(searchValue).toBe('Hello world');
    })
    test('Has placeholder', () => {
        render(<SelectWithSearch
            value={""}
            placeholderValue="Test placeholder"
            onSearchChange={() => { }}
            list={['1', '2', '3']}
        />)
        expect(screen.getByPlaceholderText('Test placeholder')).toBeDefined();
    })
});