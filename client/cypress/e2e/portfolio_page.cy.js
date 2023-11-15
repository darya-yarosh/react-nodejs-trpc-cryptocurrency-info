/// <reference types="cypress" />

import "cypress-real-events/support";

import { API } from "./api";

describe('Portfolio page', () => {
    beforeEach(() => {
        cy.visit(`${API}/portfolio`)
    })

    it('Buying coins and removing them from the portfolio', () => {
        // Opening a profile and going to the transaction page
        cy.visit(`${API}/purchase/bitcoin`)
        cy.wait(2000);

        cy.get('*[class^="SelectWithSearch_input"]').should('value', 'Bitcoin');
        cy.get('[name="quantity"]').should('value', 1)
        cy.get('*[class^="TransactionForm_price"]').contains('$').then(($span) => {
            const price = $span.text();
            cy.get('*[class^="TransactionForm_section"]').contains('label', 'Total price').next().contains(price);
        })
        cy.get('button').contains('Buy').click();
        // Send form
        cy.wait(2000);
        cy.url().then(($url) => {
            if (!$url.includes(`${API}/portfolio`)) {
                throw new Error("Not a valid url")
            }
        })
        // Checking whether the coin transactions have been deleted.
        cy.wait(2000);
        cy.get('*[class^="PortfolioCoin_wrapper"]')
            .contains('Bitcoin')
            .parent()
            .parent()
            .find('button')
            .contains('Remove', { force: true })
            .click({ force: true })
        cy.wait(2000);
        cy.get('*[class^="PortfolioCoin_wrapper"]').should('not.exist')
    })

    it('Adding coin in portfolio favorites and then removing', () => {
        cy.visit(`${API}`)
        const testCoinId = 'bitcoin';
        cy.get('*[class^="CoinNote_wrapper"] *[class^="IconButton_wrapper"]')
            .find(`[alt="Button to adding ${testCoinId} in portfolio"]`)
            .should('have.attr', 'alt', 'Button to adding bitcoin in portfolio')
            .should('have.attr', 'src', '/images/favorite/favorite-unfill.svg')
            .realHover('mouse')
            .parent()
            .trigger("click")
        cy.visit(`${API}`)
        cy.wait(500);
        cy.visit(`${API}/portfolio`)

        cy.wait(500);
        cy.get('*[class^="FavoriteCoin_wrapper"] *[class^="IconButton_wrapper"]')
            .find(`[alt="Button to adding ${testCoinId} in portfolio"]`)
            .should('have.attr', 'alt', 'Button to adding bitcoin in portfolio')
            .should('have.attr', 'src', '/images/favorite/favorite-fill.svg')
            .realHover('mouse')
            .parent()
            .trigger("click")

        cy.wait(500);
    })

    it('Opening a transaction form and closing it', () => {
        // Adding coin to Profile Favorites
        cy.visit(`${API}`)
        const testCoinId = 'bitcoin';
        cy.get('*[class^="CoinNote_wrapper"] *[class^="IconButton_wrapper"]')
            .find(`[alt="Button to adding ${testCoinId} in portfolio"]`)
            .should('have.attr', 'alt', 'Button to adding bitcoin in portfolio')
            .should('have.attr', 'src', '/images/favorite/favorite-unfill.svg')
            .realHover('mouse')
            .parent()
            .trigger("click")
        // Opening a profile and going to the transaction page
        cy.visit(`${API}/portfolio`)
        cy.wait(500);
        cy.get('*[class^="FavoriteCoin_wrapper"]')
            .realHover('mouse')
        cy.get('*[class^="FavoriteCoin_wrapper"]')
            .find('button')
            .contains('Buy', { force: true })
            .click({ force: true })
        cy.url().then(($url) => {
            if (!$url.includes(`${API}/purchase/bitcoin`)) {
                throw new Error("Not a valid url")
            }
        })
        // Closing the transaction page
        cy.wait(500);
        cy.get('[src^="/images/buttons/return.svg"]').click();
        cy.url().then(($url) => {
            if (!$url.includes(`${API}/portfolio`)) {
                throw new Error("Not a valid url")
            }
        })
    })

})
