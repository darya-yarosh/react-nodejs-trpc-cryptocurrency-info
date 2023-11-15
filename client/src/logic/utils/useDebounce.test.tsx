import { jest } from "@jest/globals";
import { screen, render } from "@testing-library/react";
import { act } from '@testing-library/react-hooks';
import userEvent from "@testing-library/user-event";

import TestComponent from 'logic/utils/UseDebounceTestComponent';

describe('useDebounce hook module', () => {
    afterEach(() => {
        jest.useRealTimers();
    });

    it('Should debounce and only change value when delay time (300) has passed', async () => {
        jest.useFakeTimers({ advanceTimers: true });

        render(<TestComponent />);
        const counterElement = screen.getByTestId('counter');
        const buttonElement = screen.getByTestId('button');

        const incrementAndPassTime = (passedTime: number) => {
            act(() => {
                jest.advanceTimersByTime(passedTime);
            });
        };

        // Debounce call with default delay (1000).
        const upCounter = async () => {
            await userEvent.click(buttonElement);
        }

        incrementAndPassTime(100);
        // Debounce in useEffect hasn't started yet
        expect(counterElement.textContent).toBe('0');

        incrementAndPassTime(200);
        // Debounce in useEffect has started
        expect(counterElement.textContent).toBe('1');

        incrementAndPassTime(100);
        // The user caused the counter to increase
        await upCounter();

        // Debounce hasn't started yet
        incrementAndPassTime(900);
        expect(counterElement.textContent).toBe('1');

        // Debounce has started
        incrementAndPassTime(100);
        expect(counterElement.textContent).toBe('2');
    });

    it('Starting the first useDebounce and overlapping it with the second useDebounce.', async () => {
        jest.useFakeTimers({ advanceTimers: true });

        render(<TestComponent />);
        const counterElement = screen.getByTestId('counter');
        const buttonElement = screen.getByTestId('button');

        const incrementAndPassTime = (passedTime: number) => {
            act(() => {
                jest.advanceTimersByTime(passedTime);
            });
        };

        // Debounce call with default delay (1000).
        const upCounter = async () => {
            await userEvent.click(buttonElement);
        }

        incrementAndPassTime(300);
        // Debounce in useEffect has started
        expect(counterElement.textContent).toBe('1');

        incrementAndPassTime(100);
        // The user called the first debounce.
        await upCounter();
        incrementAndPassTime(900);
        expect(counterElement.textContent).toBe('1');
        // The user blocked the launch of the first debounce and called a new debounce.
        await upCounter();
        incrementAndPassTime(100);
        // The previous debounce didn't start, the current debounce didn't start either.
        expect(counterElement.textContent).toBe('1');
        incrementAndPassTime(1000);
        // The current debounce has started..
        expect(counterElement.textContent).toBe('2');
    });
});