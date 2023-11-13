/// <reference types="cypress" />

export const API = 'http://localhost:3000'

describe('App navigation', () => {
    beforeEach(() => {
        cy.visit(API)
    })
    it('Go to the page with the invalid address and see the error page', () => {
        cy.visit(`${API}/test`)
    })
    it('Go to the Bitcoin cryptocurrency page', () => {
        cy.contains('table > tbody tr td', /Bitcoin/i).click();
        cy.url().then(($url) => {
            if (!$url.includes(`${API}/cryptocoins/bitcoin`)) {
                throw new Error("Not a valid url")
            }
        })
    })
    it('Go to the transaction form', () => {
        cy.visit(`${API}/cryptocoins/bitcoin`)
        cy.contains('button', 'Buy').click()
        cy.url().then(($url) => {
            if (!$url.includes(`${API}/purchase/bitcoin`)) {
                throw new Error("Not a valid url")
            }
        })
    })
    it('Go to the to the portfolio page', () => {
        cy.contains('label', /My portfolio/i).click();
        cy.url().then(($url) => {
            if (!$url.includes(`${API}/portfolio`)) {
                throw new Error("Not a valid url")
            }
        })
    })
    it('Go to the to the portfolio page and return', () => {
        cy.contains('label', /My portfolio/i).click();
        cy.url().then(($url) => {
            if (!$url.includes(`${API}/portfolio`)) {
                throw new Error("Not a valid url")
            }
        })
        cy.get('*[class^="PortfolioCard_header"] button').click();
        cy.url().then(($url) => {
            if (!$url.includes(`${API}`)) {
                throw new Error("Not a valid url")
            }
        })
    })
    // TODO redirect to error page when transferring invalid cryptocurrency
    it('Go to the page with the invalid name of the cryptocurrency and see the error page', () => {
        //cy.visit(`${API}/cryptocoins/bitcoinc`)
    })
    // TODO set up a return to the main page, not navigate back.
    it('Go to the previous page (main page)', () => {
        //cy.visit(`${API}/cryptocoins/bitcoinc`)
    })
    // TODO 
    it('Go to the previous page (another page)', () => {
        //cy.visit(`${API}/cryptocoins/bitcoinc`)
    })
})
