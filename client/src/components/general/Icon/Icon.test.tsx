import { screen, render, fireEvent } from "@testing-library/react";

import Icon from "components/general/Icon/Icon";

describe('Icon component module', () => {
    test('Show mock-icon when the icon is not found at the specified src', () => {
        const invalidSrc = '/images/coins/000_invalid_000.svg';
        render(<Icon iconSVG={invalidSrc} alt={"invalid src-icon"} />)

        const iconElement = screen.getByTestId('icon');
        fireEvent.error(screen.getByTestId('icon'));

        const mockSrc = '/images/imgNotFound.svg';
        expect(iconElement).toHaveAttribute('src', mockSrc);
    })
    test('Show icon when the icon is found at the specified src', () => {
        const validSrc = '/images/coins/btc.svg';
        render(<Icon iconSVG={validSrc} alt={"bitcoin icon"} />)

        const iconElement = screen.getByTestId('icon');
        expect(iconElement).toHaveAttribute('src', validSrc);
    })
    test('Setting the default icon size', () => {
        const validSrc = '/images/coins/btc.svg';
        render(<Icon iconSVG={validSrc} alt={"bitcoin icon"} />)

        const iconElement = screen.getByTestId('icon');

        const defaultSizeIconPX = 25;
        const styles = `width: ${defaultSizeIconPX}px; height: ${defaultSizeIconPX}px;`
        expect(iconElement).toHaveAttribute('style', styles);
    })
    test('Setting the icon size specified', () => {
        const validSrc = '/images/coins/btc.svg';
        const sizeIconPX = 40;
        render(<Icon iconSVG={validSrc} sizePX={sizeIconPX} alt={"bitcoin icon"} />)

        const iconElement = screen.getByTestId('icon');

        const styles = `width: ${sizeIconPX}px; height: ${sizeIconPX}px;`
        expect(iconElement).toHaveAttribute('style', styles);
    })
});