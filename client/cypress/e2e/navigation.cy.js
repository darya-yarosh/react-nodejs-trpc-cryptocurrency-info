/// <reference types="cypress" />

describe('App navigation', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.intercept("**")
            .as('requests')
        cy.wait('@requests')
            .its('response.statusCode')
            .should('be.oneOf', [200, 304])
        cy.viewport(1000,660)
        cy.document()
            .its("fonts.status")
            .should("equal", "loaded")
    })

    it('Go to the page with the invalid address and see the error page', () => {
        cy.visit(`/test`)
    })

    it('Go to the Bitcoin cryptocurrency page', () => {
        cy.contains('table > tbody tr td', /Bitcoin/i)
            .click();
        cy.url()
            .then(($url) => {
                if (!$url.includes(`/cryptocoins/bitcoin`)) {
                    throw new Error("Not a valid url")
                }
            })
    })

    it('Go to the transaction form', () => {
        cy.visit(`/cryptocoins/bitcoin`)
        cy.contains('button', 'Buy')
            .click()
        cy.url()
            .then(($url) => {
                if (!$url.includes(`/purchase/bitcoin`)) {
                    throw new Error("Not a valid url")
                }
            })
    })

    it('Go to the to the portfolio page', () => {
        cy.contains('label', /My portfolio/i)
            .click();
        cy.url()
            .then(($url) => {
                if (!$url.includes(`/portfolio`)) {
                    throw new Error("Not a valid url")
                }
            })
    })

    it('Go to the to the portfolio page and return', () => {
        cy.contains('label', /My portfolio/i)
            .click();
        cy.url()
            .then(($url) => {
                if (!$url.includes(`/portfolio`)) {
                    throw new Error("Not a valid url")
                }
            })
        cy.get('*[class^="PortfolioCard_header"] button')
            .click();
        cy.url()
            .then(($url) => {
                if (!$url.includes(`/`)) {
                    throw new Error("Not a valid url")
                }
            })
    })

    it('Go to the page with the invalid name of the cryptocurrency and see the error page', () => {
        cy.on('uncaught:exception', (err, runnable) => {
            const msg = 'Error loading the specified coin from the database: invalid coin id.'
            if (err.message.includes(msg)) {
                console.log('Application Error')
                return false;
            }

            return true
        })
        cy.visit(`/cryptocoins/bitcoinc`)
        cy.url()
            .then(($url) => {
                if (!$url.includes(`/cryptocoins/bitcoinc`)) {
                    throw new Error("Not a valid url")
                }
            })
        cy.contains('Something wrong')
    })

    it('Go to the previous page (main page)', () => {
        cy.visit(`/cryptocoins/bitcoin`)
        cy.get('*[class^="TextCard_header"] button:first')
            .click();
        cy.url()
            .then(($url) => {
                if (!$url.includes(`/`)) {
                    throw new Error("Not a valid url")
                }
            })
    })

    it('Go to the previous page (another page)', () => {
        cy.visit(`/cryptocoins/bitcoin`)
        cy.visit(`/purchase/bitcoin`)
        cy.go('back')
        cy.url()
            .then(($url) => {
                if (!$url.includes(`/cryptocoins/bitcoin`)) {
                    throw new Error("Not a valid url")
                }
            })

        cy.go('back')
        cy.url()
            .then(($url) => {
                if (!$url.includes(`/`)) {
                    throw new Error("Not a valid url")
                }
            })
    })
})
