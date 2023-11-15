/// <reference types="cypress" />

import { API } from "./api";
import { formatPrice, priceToNumber } from '../../src/logic/utils/Helper';

describe('Transaction page', () => {
    beforeEach(() => {
        cy.visit(`${API}/purchase/bitcoin`)
    })

    it('Price update when transaction parameters change', () => {
        cy.wait(2000);

        cy.get('*[class^="SelectWithSearch_input"]').should('value', 'Bitcoin');
        cy.get('[name="quantity"]').should('value', 1)
        cy.get('*[class^="TransactionForm_price"]').contains('$').then(($span) => {
            const price = $span.text();
            cy.get('*[class^="TransactionForm_section"]').contains('label', 'Total price').next().contains(price);
        })
        cy.get('[name="quantity"]')
            .should('value', 1)
            .clear()
            .type(2)
            .type('{del}')
            .should('value', 2)
        cy.get('*[class^="TransactionForm_price"]').contains('$').then(($span) => {
            const price = $span.text();
            const doublePrice = formatPrice((priceToNumber(price) * 2).toString());
            cy.get('*[class^="TransactionForm_section"]').contains('label', 'Total price').next().contains(doublePrice);
        })
    })
});