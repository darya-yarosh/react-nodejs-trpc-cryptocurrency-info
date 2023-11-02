"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatSupply = exports.formatPrice = exports.formatMarketCap = exports.formatPercent = exports.formatVolumeUsd24Hr = void 0;
function formatVolumeUsd24Hr(volumeUsd24Hr) {
    return new Intl.NumberFormat("en", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(volumeUsd24Hr);
}
exports.formatVolumeUsd24Hr = formatVolumeUsd24Hr;
function formatPercent(persent) {
    var percentDecimalStr = String(persent).split(".");
    var nonZeroIndex = 0;
    var currentNum = "0";
    while (currentNum === "0") {
        currentNum = String(percentDecimalStr[1])[nonZeroIndex];
        nonZeroIndex++;
    }
    return nonZeroIndex <= 2
        ? new Intl.NumberFormat("en", {
            style: "percent",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(persent / 100)
        : new Intl.NumberFormat("en", {
            style: "percent",
            minimumFractionDigits: nonZeroIndex + 3,
            maximumFractionDigits: nonZeroIndex + 3,
        }).format(persent / 100);
}
exports.formatPercent = formatPercent;
function formatMarketCap(marketCap) {
    return new Intl.NumberFormat("en", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(marketCap);
}
exports.formatMarketCap = formatMarketCap;
function formatPrice(price) {
    var priceDecimalStr = String(price).split(".");
    var nonZeroIndex = 0;
    var currentNum = "0";
    while (currentNum === "0") {
        currentNum = String(priceDecimalStr[1])[nonZeroIndex];
        nonZeroIndex++;
    }
    return nonZeroIndex < 2
        ? new Intl.NumberFormat("en", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(price)
        : new Intl.NumberFormat("en", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: nonZeroIndex + 3,
            maximumFractionDigits: nonZeroIndex + 3,
        }).format(price);
}
exports.formatPrice = formatPrice;
function formatSupply(supply, symbol) {
    var value = supply === null ? Infinity : supply;
    return (new Intl.NumberFormat("en", {
        maximumFractionDigits: 0,
    }).format(value) +
        " " +
        symbol);
}
exports.formatSupply = formatSupply;
