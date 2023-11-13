/// <reference types="cypress" />

import { API } from "./navigation.cy";

describe('Main page', () => {
    beforeEach(() => {
        cy.visit(API)
    })
    it('Coins searching', () => {
        cy.get('*[class^="SearchInput_wrapper"] input').focus().type('aave');
        cy.wait(500).get('*[class^="CoinNote_wrapper"] p').contains('AAVE');
    })
    //TODO
    it('Coins sorting', () => {
    })
})
