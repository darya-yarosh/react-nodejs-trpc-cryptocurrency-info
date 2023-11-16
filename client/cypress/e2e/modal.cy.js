/// <reference types="cypress" />

describe('Modal', () => {
    beforeEach(() => {
        cy.visit(`/portfolio`)
    })
    
    it('Close modal by clicking on backdrop', () => {
        cy.get('*[class^="Modal_backdrop"]').click('topLeft', { force: true });
        cy.url().then(($url) => {
            if (!$url.includes(`/`)) {
                throw new Error("Not a valid url")
            }
        })
    })
})
