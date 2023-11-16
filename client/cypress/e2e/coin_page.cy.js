/// <reference types="cypress" />

import "cypress-real-events/support";

describe('Coin page', () => {
    beforeEach(() => {
        cy.visit(`/cryptocoins/bitcoin`)
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
            .wait(3000)
        cy.get(`*[class^="Select_wrapper"]`)
            .contains('Period per')
            .parent()
            .find('select')
            .select('w1')
            .wait(3000)
        cy.get(`*[class^="Select_wrapper"]`)
            .contains('Period per')
            .parent()
            .find('select')
            .select('d1')
            .wait(3000)
    })

    it('Opening a transaction form and closing it', ()=>{
        // Going to the transaction page
        cy.get(`*[class^="Button_wrapper"]`)
        .contains('Buy')
        .realHover('mouse')
        .parent()
        .trigger("click")
        cy.url().then(($url) => {
            if (!$url.includes(`/purchase/bitcoin`)) {
                throw new Error("Not a valid url")
            }
        })
        // Closing the transaction page
        cy.wait(500);
        cy.get('[src^="/images/buttons/return.svg"]').click();
        cy.url().then(($url) => {
            if (!$url.includes(`/cryptocoins/bitcoin`)) {
                throw new Error("Not a valid url")
            }
        })
    })
})
