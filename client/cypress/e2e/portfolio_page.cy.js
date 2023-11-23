/// <reference types="cypress" />

import "cypress-real-events/support";

describe('Portfolio page', () => {
    beforeEach(() => {
        cy.visit(`/portfolio`)
        cy.intercept("**")
            .as('requests')
        cy.wait('@requests')
            .its('response.statusCode')
            .should('be.oneOf', [200, 304])
        cy.viewport(1000,660)
    })

    it('Buying coins and removing them from the portfolio', () => {
        // Opening a portfolio and going to the transaction page
        cy.visit(`/purchase/bitcoin`)

        cy.get('*[class^="SelectWithSearch_input"]')
            .should('value', 'Bitcoin');
        cy.get('[name="quantity"]')
            .should('value', 1)
        cy.get('*[class^="TransactionForm_price"]')
            .contains('$0')
            .should('not.exist');
        cy.get('*[class^="TransactionForm_price"]')
            .contains('$')
            .then(($span) => {
                const price = $span.text();
                cy.get('*[class^="TransactionForm_section"]')
                    .contains('label', 'Total price')
                    .next()
                    .contains(price);
            })
        cy.get('button')
            .contains('Buy')
            .click()
        // Send form
        cy.url()
            .then(($url) => {
                if (!$url.includes(`/portfolio`)) {
                    throw new Error("Not a valid url")
                }
            })
        // Checking whether the coin transactions have been deleted.
        cy.get('*[class^="PortfolioCoin_wrapper"]')
            .should('be.visible')
            .contains('Bitcoin')
            .parent()
            .parent()
            .find('button')
            .contains('Remove', { force: true })
            .click({ force: true })
        cy.get('*[class^="PortfolioCoin_wrapper"]')
            .should('not.exist')
    })

    it('Adding coin in portfolio favorites and then removing', () => {
        // Adding coin to Portfolio Favorites
        cy.visit(`/`)
        const testCoinId = 'bitcoin';
        cy.get('*[class^="CoinNote_wrapper"] *[class^="IconButton_wrapper"]')
            .find(`[alt="Button to adding ${testCoinId} in portfolio"]`)
            .should('have.attr', 'alt', 'Button to adding bitcoin in portfolio')
            .should('have.attr', 'src', '/images/favorite/favorite-unfill.svg')
            .realHover('mouse')
            .parent()
            .trigger("click")
        cy.visit(`/`)
        // Removing coin from Portfolio Favorites
        cy.visit(`/portfolio`)
        cy.get('*[class^="FavoriteCoin_wrapper"] *[class^="IconButton_wrapper"]')
            .find(`[alt="Button to adding ${testCoinId} in portfolio"]`)
            .should('have.attr', 'alt', 'Button to adding bitcoin in portfolio')
            .should('have.attr', 'src', '/images/favorite/favorite-fill.svg')
            .realHover('mouse')
            .parent()
            .trigger("click")
        // Checking for the absence of an element.
        cy.get('*[class^="FavoriteCoin_wrapper"] *[class^="IconButton_wrapper"]')
            .should('not.exist')
    })

    it('Opening a transaction form and closing it', () => {
        // Adding coin to Portfolio Favorites
        cy.visit(`/`)
        const testCoinId = 'bitcoin';
        cy.get('*[class^="CoinNote_wrapper"] *[class^="IconButton_wrapper"]')
            .find(`[alt="Button to adding ${testCoinId} in portfolio"]`)
            .should('have.attr', 'alt', 'Button to adding bitcoin in portfolio')
            .should('have.attr', 'src', '/images/favorite/favorite-unfill.svg')
            .realHover('mouse')
            .parent()
            .trigger("click")
        // Opening a portfolio and going to the transaction page
        cy.visit(`/portfolio`)
        cy.get('*[class^="FavoriteCoin_wrapper"]')
            .realHover('mouse')
        cy.get('*[class^="FavoriteCoin_wrapper"]')
            .find('button')
            .contains('Buy', { force: true })
            .click({ force: true })
        cy.url()
            .then(($url) => {
                if (!$url.includes(`/purchase/bitcoin`)) {
                    throw new Error("Not a valid url")
                }
            })
        // Closing the transaction page
        cy.get('[src^="/images/buttons/return.svg"]')
            .should('be.visible')
            .click();
        cy.url()
            .then(($url) => {
                if (!$url.includes(`/portfolio`)) {
                    throw new Error("Not a valid url")
                }
            })
    })

})
