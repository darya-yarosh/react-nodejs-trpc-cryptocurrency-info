/// <reference types="cypress" />

import "cypress-real-events/support";

const sortLabel = {
    rank: 'Rank',
    price: 'Price',
    marketCap: 'MarketCap',
    change24hPercent: '24h %'
}

const sortIconAlt = {
    rank: 'Rank',
    price: 'Price',
    marketCap: 'Market Cap',
    change24hPercent: '24h %'
}

const sortIconSrc = {
    enabled: '/images/sort/sort-enabled.svg',
    disabled: '/images/sort/sort-disabled.svg',
    asc: '/images/sort/sort-asc.svg',
    desc: '/images/sort/sort-desc.svg'
}

function checkIconSrc(alt, src) {
    cy.get(`[alt="sort icon for ${alt}"]`)
        .should('have.attr', 'src', src);
}

function clickLabel(label) {
    cy.get('*[class^="CoinTable_columnName"] label')
        .contains(label)
        .click();
}

describe('Main page', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('Coins searching', () => {
        cy.get('*[class^="SearchInput_wrapper"] input')
            .focus()
            .type('aave');
        cy.wait(500)
            .get('*[class^="CoinNote_wrapper"] p')
            .contains('AAVE');
    })
    
    it('Coins sorting by Rank', () => {
        checkIconSrc(sortIconAlt.rank, sortIconSrc.asc);

        clickLabel(sortLabel.rank)
        checkIconSrc(sortIconAlt.rank, sortIconSrc.desc);
    })
    
    it('Coins sorting by Price', () => {
        checkIconSrc(sortIconAlt.price, sortIconSrc.enabled);

        clickLabel(sortLabel.price)
        checkIconSrc(sortIconAlt.price, sortIconSrc.asc);

        clickLabel(sortLabel.price)
        checkIconSrc(sortIconAlt.price, sortIconSrc.desc);
    })
    
    it('Coins sorting by Market Cap', () => {
        checkIconSrc(sortIconAlt.marketCap, sortIconSrc.enabled);

        clickLabel(sortLabel.marketCap)
        checkIconSrc(sortIconAlt.marketCap, sortIconSrc.asc);

        clickLabel(sortLabel.marketCap)
        checkIconSrc(sortIconAlt.marketCap, sortIconSrc.desc);
    })
    
    it('Coins sorting by 24h %', () => {
        checkIconSrc(sortIconAlt.change24hPercent, sortIconSrc.enabled);

        clickLabel(sortLabel.change24hPercent)
        checkIconSrc(sortIconAlt.change24hPercent, sortIconSrc.asc);

        clickLabel(sortLabel.change24hPercent)
        checkIconSrc(sortIconAlt.change24hPercent, sortIconSrc.desc);
    })

    it('Adding coin in portfolio favorites and then removing', () => {
        const testCoinId = 'bitcoin';
        cy.get('*[class^="CoinNote_wrapper"] *[class^="IconButton_wrapper"]')
            .find(`[alt="Button to adding ${testCoinId} in portfolio"]`)
            .should('have.attr', 'alt', 'Button to adding bitcoin in portfolio')
            .should('have.attr', 'src', '/images/favorite/favorite-unfill.svg')
            .realHover('mouse')
            .parent()
            .trigger("click")

        cy.visit('/')
        cy.get('*[class^="CoinNote_wrapper"] *[class^="IconButton_wrapper"]')
            .find(`[alt="Button to adding ${testCoinId} in portfolio"]`)
            .should('have.attr', 'alt', 'Button to adding bitcoin in portfolio')
            .should('have.attr', 'src', '/images/favorite/favorite-fill.svg')
            .realHover('mouse')
            .parent()
            .trigger("click");

        cy.visit('/')
        cy.get('*[class^="CoinNote_wrapper"] *[class^="IconButton_wrapper"]')
            .find(`[alt="Button to adding ${testCoinId} in portfolio"]`)
            .should('have.attr', 'alt', 'Button to adding bitcoin in portfolio')
            .should('have.attr', 'src', '/images/favorite/favorite-unfill.svg');
    })
})
