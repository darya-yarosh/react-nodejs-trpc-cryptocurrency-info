import { screen, render } from "@testing-library/react";

import FavoriteButton from './FavoriteButton';

describe('Favorite Button component module', () => {
    test('Disabled status', () => {
        const isDisabled = true;
        render(<FavoriteButton
            coinId={"testCoin"}
            disabled={isDisabled}
        />)

        const iconButtonElement = screen.getByTestId('iconButton-button');
        expect(iconButtonElement).toBeDisabled();
    })
    test('Enabled status', () => {
        const isDisabled = false;
        render(<FavoriteButton
            coinId={"testCoin"}
            disabled={isDisabled}
        />)

        const iconButtonElement = screen.getByTestId('iconButton-button');
        expect(iconButtonElement).toBeEnabled();
    })
    test('Show unfill-icon when the icon is not favorited', () => {
        const validSrc = '/images/favorite/favorite-unfill.svg';
        render(<FavoriteButton
            coinId={"testCoin"}
            disabled={false}
        />)

        const iconButtonElement = screen.getByTestId('iconButton-icon');

        expect(iconButtonElement).toHaveAttribute('src', validSrc);
    })
});