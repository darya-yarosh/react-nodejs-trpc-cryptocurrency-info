/// <reference types="cypress" />

describe('Modal', () => {
    beforeEach(() => {
        cy.visit(`/portfolio`)
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

    it('Close modal by clicking on backdrop', () => {
        cy.get('*[class^="Modal_backdrop"]')
            .click('topLeft', { force: true });
        cy.url()
            .then(($url) => {
                if (!$url.includes(`/`)) {
                    throw new Error("Not a valid url")
                }
            })
    })
})
