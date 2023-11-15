"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatSupply = exports.formatPrice = exports.formatMarketCap = exports.formatPercent = exports.formatVolumeUsd24Hr = void 0;
function formatVolumeUsd24Hr(volumeUsd24Hr) {
    return new Intl.NumberFormat('en', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(volumeUsd24Hr);
}
exports.formatVolumeUsd24Hr = formatVolumeUsd24Hr;
function formatPercent(percent) {
    var percentDecimalStr = (percent !== null && percent !== undefined)
        ? percent.split('.')
        : '0'.split('.');
    if (percentDecimalStr[1] === undefined) {
        percentDecimalStr.push('00');
    }
    var nonZeroIndex = 0;
    var currentNum = '0';
    while (currentNum === '0'
        && nonZeroIndex < percentDecimalStr[1].length) {
        currentNum = String(percentDecimalStr[1])[nonZeroIndex];
        nonZeroIndex++;
    }
    return nonZeroIndex <= 2
        ? new Intl.NumberFormat('en', {
            style: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(Number(percentDecimalStr.join('.')) / 100)
        : new Intl.NumberFormat('en', {
            style: 'percent',
            minimumFractionDigits: nonZeroIndex + 3,
            maximumFractionDigits: nonZeroIndex + 3,
        }).format(Number(percentDecimalStr.join('.')) / 100);
}
exports.formatPercent = formatPercent;
function formatMarketCap(marketCap) {
    return new Intl.NumberFormat('en', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(marketCap);
}
exports.formatMarketCap = formatMarketCap;
function formatPrice(price) {
    var priceDecimalStr = (price !== null && price !== undefined)
        ? price.split('.')
        : '0'.split('.');
    if (priceDecimalStr[1] === undefined) {
        priceDecimalStr.push('00');
    }
    var nonZeroIndex = 0;
    var currentNum = '0';
    while (currentNum === '0'
        && nonZeroIndex < priceDecimalStr[1].length) {
        currentNum = String(priceDecimalStr[1])[nonZeroIndex];
        nonZeroIndex++;
    }
    var priceDecimalStrTail = '0'.repeat(nonZeroIndex - 1)
        + priceDecimalStr[1][nonZeroIndex - 1]
        + (priceDecimalStr[1][nonZeroIndex] !== undefined
            ? priceDecimalStr[1][nonZeroIndex]
            : '0')
        + (priceDecimalStr[1][nonZeroIndex + 1] !== undefined
            ? priceDecimalStr[1][nonZeroIndex + 1]
            : '0')
        + (priceDecimalStr[1][nonZeroIndex + 2] !== undefined
            ? priceDecimalStr[1][nonZeroIndex + 2]
            : '0');
    return nonZeroIndex <= 2
        ? new Intl.NumberFormat('en', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(Number(price))
        : new Intl.NumberFormat('en', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(Number(priceDecimalStr[0]))
            + '.' + priceDecimalStrTail.toString();
}
exports.formatPrice = formatPrice;
function formatSupply(supply, symbol) {
    var value = supply === null ? Infinity : supply;
    return (new Intl.NumberFormat('en', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value) +
        ' ' +
        symbol);
}
exports.formatSupply = formatSupply;
