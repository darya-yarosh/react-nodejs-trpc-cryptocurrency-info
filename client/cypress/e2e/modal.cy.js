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
        // https://developer.mozilla.org/en-US/docs/Web/API/FontFaceSet/ready
        // The promise will only resolve once the document has completed loading fonts,
        // layout operations are completed, and no further font loads are needed.
        cy.document()
            .then(document => document.fonts.ready)
            .then(value => {
                cy.log('Font loading completed');
            })
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
