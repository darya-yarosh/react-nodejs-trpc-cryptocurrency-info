/// <reference types="cypress" />

import "cypress-real-events/support";
import { checkFonts } from "../support/helpers";

const sortLabel = {
    rank: 'Rank',
    price: 'Price',
    marketCap: 'MarketCap',
    changePerDay: '24h %'
}

const sortIconAlt = {
    rank: 'Rank',
    price: 'Price',
    marketCap: 'Market Cap',
    changePerDay: '24h %'
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
        .click()
        .wait(500)
}

function checkSorting(sortType) {
    const rankClass = '*[class^="CoinTable_columnName__withSort"]'
    const rankLabel = sortType.charAt(0).toUpperCase() + sortType.slice(1);
    const rankIconName = sortType.charAt(0).toLowerCase() + sortType.slice(1);
    const alt = sortType === '24h' ? sortIconAlt.changePerDay : sortIconAlt[rankIconName]
    const label = sortType === '24h' ? sortLabel.changePerDay : sortLabel[rankIconName]

    if (label.toString() !== sortLabel.rank.toString()) {
        cy.get(rankClass)
            .should('be.visible')
            .contains(rankLabel)
            .matchImageSnapshot(`main-coins_sorting_${rankIconName}-enabled`)
        clickLabel(label)
    }

    checkIconSrc(alt, sortIconSrc.asc);
    cy.get(rankClass)
        .contains(rankLabel)
        .matchImageSnapshot(`main-coins_sorting_${rankIconName}-asc`)

    clickLabel(label)
    checkIconSrc(alt, sortIconSrc.desc);
    cy.get(rankClass)
        .contains(rankLabel)
        .matchImageSnapshot(`main-coins_sorting_${rankIconName}-desc`)

    if (label.toString() === sortLabel.rank.toString()) {
        clickLabel(sortLabel.price)
        checkIconSrc(alt, sortIconSrc.enabled);
        cy.get(rankClass)
            .contains(rankLabel)
            .matchImageSnapshot(`main-coins_sorting_${rankIconName}-enabled`)
    }
}

describe('Main page', () => {
    beforeEach(() => {
        cy.intercept("**")
            .as('requests')
        cy.visit('/')
        cy.wait('@requests')
            .its('response.statusCode')
            .should('be.oneOf', [200, 304])
        cy.viewport(1000,660)
        checkFonts()
    })

    it('Coins searching', () => {
        cy.get('*[class^="SearchInput_wrapper"]')
            .should('be.visible')
            .should('have.attr', 'placeholder', 'Search by name...')
        cy.get('*[class^="SearchInput_wrapper"]')
            .matchImageSnapshot('main-coins_search-filter-empty')

        cy.get('*[class^="SearchInput_wrapper"] input')
            .as('searchInput')
            .type('aave')
        cy.get('@searchInput')
            .blur()

        cy.get('@searchInput')
            .should('value', 'aave')
        cy.get('*[class^="SearchInput_wrapper"]')
            .should('be.visible')
            .matchImageSnapshot('main-coins_search-filter-full')

        cy.get('*[class^="CoinNote_wrapper"] p')
            .contains('AAVE');
    })

    it('Coins sorting by Rank', () => {
        checkSorting('rank')
    })

    it('Coins sorting by Price', () => {
        checkSorting('price')
    })

    it('Coins sorting by Market Cap', () => {
        checkSorting('marketCap')
    })

    it('Coins sorting by 24h %', () => {
        checkSorting('24h')
    })

    it('Adding coin in portfolio favorites and then removing', () => {
        const testCoinId = 'bitcoin';
        const coinClass = '*[class^="CoinNote_wrapper"] *[class^="IconButton_wrapper"]';
        const coinAlt = `[alt="Button to adding ${testCoinId} in portfolio"]`;

        cy.get(coinClass)
            .should('be.visible')
            .find(coinAlt)
            .matchImageSnapshot('main_coin-unfavorited')
        cy.get(coinClass)
            .find(coinAlt)
            .should('have.attr', 'src', '/images/favorite/favorite-unfill.svg')
            .realHover('mouse')
            .parent()
            .trigger("click")

        cy.visit('/')
        cy.get(coinClass)
            .find(coinAlt)
            .matchImageSnapshot('main_coin-favorited')
        cy.get(coinClass)
            .find(coinAlt)
            .should('have.attr', 'src', '/images/favorite/favorite-fill.svg')
            .realHover('mouse')
            .parent()
            .trigger("click");

        cy.visit('/')
        cy.get(coinClass)
            .find(coinAlt)
            .should('have.attr', 'src', '/images/favorite/favorite-unfill.svg');
    })

    it('Pagination by coins', () => {
        const paginationButtonClass = '*[class^="Pagination_pageNum"';
        const paginationWrapperClass = '*[class^="Pagination_pagination"]'

        cy.get(paginationButtonClass)
            .should('be.visible')
            .contains('1');
        cy.get(paginationWrapperClass)
            .matchImageSnapshot('main-coins_pagination_page-first')

        cy.get(paginationButtonClass)
            .contains('>')
            .trigger("click")
        cy.get(paginationButtonClass)
            .should('be.visible')
            .contains('2');
        cy.get(paginationWrapperClass)
            .matchImageSnapshot('main-coins_pagination_page-first-to-second')

        cy.get(paginationButtonClass)
            .contains('<')
            .trigger("click")
        cy.get(paginationButtonClass)
            .should('be.visible')
            .contains('1');
        cy.get(paginationWrapperClass)
            .matchImageSnapshot('main-coins_pagination_page-second-to-first')
    })
})
