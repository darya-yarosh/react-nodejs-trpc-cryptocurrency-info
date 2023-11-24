/// <reference types="cypress" />

import "cypress-real-events/support";

describe('Coin page', () => {
    beforeEach(() => {
        cy.intercept("**")
            .as('requests')
        cy.visit(`/cryptocoins/bitcoin`)
        cy.wait('@requests')
            .its('response.statusCode')
            .should('be.oneOf', [200, 304])
        cy.viewport(1000,660)
        // https://developer.mozilla.org/en-US/docs/Web/API/FontFaceSet/ready
        // The promise will only resolve once the document has completed loading fonts,
        // layout operations are completed, and no further font loads are needed.
        cy.document()
            .then(document => document.fonts.ready)
            .then(value => {
                cy.log('Font loading completed');
            })
    })

    it('Adding coin in portfolio favorites and then removing', () => {
        const testCoinId = 'bitcoin';
        cy.get(`[alt="Button to adding ${testCoinId} in portfolio"]`)
            .should('have.attr', 'alt', 'Button to adding bitcoin in portfolio')
            .should('have.attr', 'src', '/images/favorite/favorite-unfill.svg')
            .realHover('mouse')
            .parent()
            .trigger("click")

        cy.visit(`/cryptocoins/bitcoin`)
        cy.get(`[alt="Button to adding ${testCoinId} in portfolio"]`)
            .should('have.attr', 'alt', 'Button to adding bitcoin in portfolio')
            .should('have.attr', 'src', '/images/favorite/favorite-fill.svg')
            .realHover('mouse')
            .parent()
            .trigger("click");

        cy.visit(`/cryptocoins/bitcoin`)
        cy.get(`[alt="Button to adding ${testCoinId} in portfolio"]`)
            .should('have.attr', 'alt', 'Button to adding bitcoin in portfolio')
            .should('have.attr', 'src', '/images/favorite/favorite-unfill.svg')
    })

    it('Choosing a schedule of price changes for a day/week/month', () => {
        cy.get(`*[class^="Select_wrapper"]`)
            .contains('Period per')
            .parent()
            .find('select')
            .select('m1')
        cy.get(`*[class^="Select_wrapper"]`)
            .matchImageSnapshot('coin_selector_period-month')
        cy.get(`*[class^="Select_wrapper"]`)
            .contains('Period per')
            .parent()
            .find('select')
            .select('w1')
        cy.get(`*[class^="Select_wrapper"]`)
            .matchImageSnapshot('coin_selector_period-weak')

        cy.get(`*[class^="Select_wrapper"]`)
            .contains('Period per')
            .parent()
            .find('select')
            .select('d1')
        cy.get(`*[class^="Select_wrapper"]`)
            .matchImageSnapshot('coin_selector_period-day')
    })

    it('Opening a transaction form and closing it', () => {
        // Going to the transaction page
        cy.get(`*[class^="Button_wrapper"]`)
            .contains('Buy')
            .realHover('mouse')
            .parent()
            .trigger("click")
        cy.url()
            .then(($url) => {
                if (!$url.includes(`/purchase/bitcoin`)) {
                    throw new Error("Not a valid url")
                }
            })
        // Closing the transaction page
        cy.get('[src^="/images/buttons/return.svg"]').click();
        cy.url()
            .then(($url) => {
                if (!$url.includes(`/cryptocoins/bitcoin`)) {
                    throw new Error("Not a valid url")
                }
            })
    })
})
