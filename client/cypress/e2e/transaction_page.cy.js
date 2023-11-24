/// <reference types="cypress" />

import { formatPrice, priceToNumber } from '../../src/logic/utils/Helper';

describe('Transaction page', () => {
    beforeEach(() => {
        cy.visit(`/purchase/bitcoin`)
        cy.intercept("**").as('requests')
        cy.wait('@requests')
            .its('response.statusCode')
            .should('be.oneOf', [200, 304])
        cy.viewport(1000,660)
        cy.document()
            .its("fonts.status")
            .should("equal", "loaded")     
    })

    it('Price update when transaction parameters change', () => {
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
                    .should('be.visible')
                    .contains('label', 'Total price')
                    .next()
                    .contains(price);
            })
        cy.get('[name="quantity"]')
            .matchImageSnapshot('transaction_quantity-before')
        cy.get('[name="quantity"]')
            .as('quantity')
            .should('value', 1)
            .clear()
            .type(2)
            .type('{del}')
            .should('value', 2)
        cy.get('@quantity')
            .trigger('blur')
            .wait(200)
        cy.get('@quantity')
            .matchImageSnapshot('transaction_quantity-after')
        cy.get('*[class^="TransactionForm_price"]')
            .contains('$')
            .then(($span) => {
                const price = $span.text();
                const doublePrice = formatPrice((priceToNumber(price) * 2).toString());
                cy.get('*[class^="TransactionForm_section"]')
                    .contains('label', 'Total price')
                    .next()
                    .contains(doublePrice);
            })
    })
});