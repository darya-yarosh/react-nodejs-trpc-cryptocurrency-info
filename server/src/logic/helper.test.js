"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var globals_1 = require("@jest/globals");
var helper = __importStar(require("logic/helper"));
(0, globals_1.describe)('helper module: format', function () {
    (0, globals_1.test)('format price', function () {
        (0, globals_1.expect)(helper.formatPrice('27')).toBe('$27.00');
        (0, globals_1.expect)(helper.formatPrice('20000')).toBe('$20,000.00');
        (0, globals_1.expect)(helper.formatPrice('20000.01')).toBe('$20,000.01');
        (0, globals_1.expect)(helper.formatPrice('20000.99')).toBe('$20,000.99');
        (0, globals_1.expect)(helper.formatPrice('20000.0000023')).toBe('$20,000.000002300');
        (0, globals_1.expect)(helper.formatPrice('20000.000000000023')).toBe('$20,000.00000000002300');
        (0, globals_1.expect)(helper.formatPrice('20000.0000000000000023')).toBe('$20,000.000000000000002300');
        (0, globals_1.expect)(helper.formatPrice('20000.00000000000000237683')).toBe('$20,000.000000000000002376');
    });
    (0, globals_1.test)('format supply', function () {
        (0, globals_1.expect)(helper.formatSupply(27, 'BTC')).toBe('27 BTC');
        (0, globals_1.expect)(helper.formatSupply(20000, 'BTC')).toBe('20,000 BTC');
        (0, globals_1.expect)(helper.formatSupply(20000.01, 'BTC')).toBe('20,000 BTC');
        (0, globals_1.expect)(helper.formatSupply(20000.99, 'BTC')).toBe('20,001 BTC');
        (0, globals_1.expect)(helper.formatSupply(null, 'BTC')).toBe('∞ BTC');
    });
    (0, globals_1.test)('format market cap', function () {
        (0, globals_1.expect)(helper.formatMarketCap(20)).toBe('$20');
        (0, globals_1.expect)(helper.formatMarketCap(20000)).toBe('$20,000');
        (0, globals_1.expect)(helper.formatMarketCap(20000.01)).toBe('$20,000');
        (0, globals_1.expect)(helper.formatMarketCap(20000.99)).toBe('$20,001');
    });
    (0, globals_1.test)('format volume usd 24hr', function () {
        (0, globals_1.expect)(helper.formatVolumeUsd24Hr(20)).toBe('$20');
        (0, globals_1.expect)(helper.formatVolumeUsd24Hr(20000)).toBe('$20,000');
        (0, globals_1.expect)(helper.formatVolumeUsd24Hr(20000.01)).toBe('$20,000');
        (0, globals_1.expect)(helper.formatVolumeUsd24Hr(20000.99)).toBe('$20,001');
    });
    (0, globals_1.test)('format percent', function () {
        (0, globals_1.expect)(helper.formatPercent('27')).toBe('27.00%');
        (0, globals_1.expect)(helper.formatPercent('0.02')).toBe('0.02%');
        (0, globals_1.expect)(helper.formatPercent('0.09')).toBe('0.09%');
        (0, globals_1.expect)(helper.formatPercent('0.099')).toBe('0.10%');
        (0, globals_1.expect)(helper.formatPercent('0.099458012')).toBe('0.10%');
        (0, globals_1.expect)(helper.formatPercent('0.0000125436')).toBe('0.00001254%');
        (0, globals_1.expect)(helper.formatPercent('0.0000925436')).toBe('0.00009254%');
        (0, globals_1.expect)(helper.formatPercent('20.00000000000012')).toBe('20.0000000000001200%');
    });
});
