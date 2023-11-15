/// <reference types="cypress" />

import { API } from "./api";

describe('Modal', () => {
    beforeEach(() => {
        cy.visit(`${API}/portfolio`)
    })
    
    it('Close modal by clicking on backdrop', () => {
        cy.get('*[class^="Modal_backdrop"]').click('topLeft', { force: true });
        cy.url().then(($url) => {
            if (!$url.includes(`${API}`)) {
                throw new Error("Not a valid url")
            }
        })
    })
})
