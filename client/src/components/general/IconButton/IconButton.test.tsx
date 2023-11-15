import { screen, render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import IconButton from "./IconButton";

describe('Icon Button component module', () => {
    test('Has valid structure of childs', () => {
        render(<IconButton
            iconSVG={""}
            caption={"test icon button"}
            onClick={() => { }}
        />)

        const buttonElement = screen.getByTestId('iconButton-button');
        const iconElement = screen.getByTestId('iconButton-icon');

        expect(buttonElement).toBeDefined()
        expect(buttonElement).toContainHTML('img');
        expect(iconElement).toBeDefined()
    })

    test('Working onClick', async () => {
        let counter = 0;
        render(<IconButton
            data-testid={'iconButton'}
            iconSVG={""}
            caption={"test icon button"}
            onClick={() => { counter++ }}
        />)

        const iconButtonElement = screen.getByTestId('iconButton-button');

        expect(counter).toBe(0);
        await userEvent.click(iconButtonElement);
        expect(counter).toBe(1);
    })

    test('Disabled status', () => {
        const isDisabled = true;
        render(
            <IconButton
                data-testid={'iconButton'}
                iconSVG={""}
                caption={"test icon button"}
                onClick={() => { }}
                disabled={isDisabled}
            />
        )

        const iconButtonElement = screen.getByTestId('iconButton-button');
        expect(iconButtonElement).toBeDisabled();
    })

    test('Enabled status', () => {
        const isDisabled = false;
        render(
            <IconButton
                iconSVG={""}
                caption={"test icon button"}
                onClick={() => { }}
                disabled={isDisabled}
            />
        )

        const iconButtonElement = screen.getByTestId('iconButton-button');
        expect(iconButtonElement).toBeEnabled();
    })

    test('Show mock-icon when the icon is not found at the specified src', () => {
        const invalidSrc = '/images/coins/000_invalid_000.svg';
        render(
            <IconButton
                iconSVG={invalidSrc}
                caption={"test icon button"}
                onClick={() => { }}
            />)

        const iconButtonElement = screen.getByTestId('iconButton-icon');
        fireEvent.error(iconButtonElement);

        const mockSrc = '/images/imgNotFound.svg';
        expect(iconButtonElement).toHaveAttribute('src', mockSrc);
    })

    test('Show icon when the icon is found at the specified src', () => {
        const validSrc = '/images/coins/btc.svg';
        render(<IconButton
            iconSVG={validSrc}
            caption={"test icon button"}
            onClick={() => { }}
        />)

        const iconButtonElement = screen.getByTestId('iconButton-icon');
        expect(iconButtonElement).toHaveAttribute('src', validSrc);
    })

    test('Setting the default icon size', () => {
        const validSrc = '/images/coins/btc.svg';
        render(<IconButton
            iconSVG={validSrc}
            caption={"test icon button"}
            onClick={() => { }}
        />)

        const iconButtonElement = screen.getByTestId('iconButton-icon');

        const defaultSizeIconPX = 25;
        const styles = `width: ${defaultSizeIconPX}px; height: ${defaultSizeIconPX}px;`
        expect(iconButtonElement).toHaveAttribute('style', styles);
    })

    test('Setting the icon size specified', () => {
        const validSrc = '/images/coins/btc.svg';
        const sizeIconPX = 40;
        render(<IconButton
            iconSVG={validSrc}
            caption={"test icon button"}
            onClick={() => { }}
            sizePX={sizeIconPX}
        />)

        const iconButtonElement = screen.getByTestId('iconButton-icon');

        const styles = `width: ${sizeIconPX}px; height: ${sizeIconPX}px;`
        expect(iconButtonElement).toHaveAttribute('style', styles);
    })
});