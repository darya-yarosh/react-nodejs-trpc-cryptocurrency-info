import { screen, render, act } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import Button from "./Button";

describe('Button component module', () => {
    test('Working onClick', () => {
        let counter = 0;
        render(<Button
            data-testid="button"
            label={"Test button"}
            onClick={() => { counter++ }} />)

        const buttonElement = screen.getByTestId('button');
        const upCounter = () => {
            // eslint-disable-next-line testing-library/no-unnecessary-act
            act(() => {
                userEvent.click(buttonElement);
            });
        }

        expect(counter).toBe(0);
        upCounter()
        expect(counter).toBe(1);
    })
    test('Disabled status', () => {
        const isDisabled = true;
        render(
            <Button
                label={"Test button"}
                disabled={isDisabled}
                onClick={() => { }}
            />
        )

        const buttonElement = screen.getByTestId('button');
        expect(buttonElement).toBeDisabled();
    })
    test('Enabled status', () => {
        const isDisabled = false;
        render(
            <Button
                label={"Test button"}
                disabled={isDisabled}
                onClick={() => { }}
            />
        )

        const buttonElement = screen.getByTestId('button');
        expect(buttonElement).toBeEnabled();
    })
});