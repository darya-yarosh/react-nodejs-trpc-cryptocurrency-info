import { describe, expect, test } from '@jest/globals';
import * as helper from 'logic/helper';

describe('helper module: format', () => {
    test('format price', () => {
        expect(helper.formatPrice('27')).toBe('$27.00');
        expect(helper.formatPrice('20000')).toBe('$20,000.00');
        expect(helper.formatPrice('20000.01')).toBe('$20,000.01');
        expect(helper.formatPrice('20000.99')).toBe('$20,000.99');
        expect(helper.formatPrice('20000.0000023')).toBe('$20,000.000002300');
        expect(helper.formatPrice('20000.000000000023')).toBe('$20,000.00000000002300');
        expect(helper.formatPrice('20000.0000000000000023')).toBe('$20,000.000000000000002300');
        expect(helper.formatPrice('20000.00000000000000237683')).toBe('$20,000.000000000000002376');
    });
    test('format supply', () => {
        expect(helper.formatSupply(27, 'BTC')).toBe('27 BTC');
        expect(helper.formatSupply(20000, 'BTC')).toBe('20,000 BTC');
        expect(helper.formatSupply(20000.01, 'BTC')).toBe('20,000 BTC');
        expect(helper.formatSupply(20000.99, 'BTC')).toBe('20,001 BTC');
        expect(helper.formatSupply(null, 'BTC')).toBe('∞ BTC');
    });
    test('format market cap', () => {
        expect(helper.formatMarketCap(20)).toBe('$20');
        expect(helper.formatMarketCap(20000)).toBe('$20,000');
        expect(helper.formatMarketCap(20000.01)).toBe('$20,000');
        expect(helper.formatMarketCap(20000.99)).toBe('$20,001');
    });
    test('format volume usd 24hr', () => {
        expect(helper.formatVolumeUsd24Hr(20)).toBe('$20');
        expect(helper.formatVolumeUsd24Hr(20000)).toBe('$20,000');
        expect(helper.formatVolumeUsd24Hr(20000.01)).toBe('$20,000');
        expect(helper.formatVolumeUsd24Hr(20000.99)).toBe('$20,001');
    });
    test('format percent', () => {
        expect(helper.formatPercent('27')).toBe('27.00%');
        expect(helper.formatPercent('0.02')).toBe('0.02%');
        expect(helper.formatPercent('0.09')).toBe('0.09%');
        expect(helper.formatPercent('0.099')).toBe('0.10%');
        expect(helper.formatPercent('0.099458012')).toBe('0.10%');
        expect(helper.formatPercent('0.0000125436')).toBe('0.00001254%');
        expect(helper.formatPercent('0.0000925436')).toBe('0.00009254%');
        expect(helper.formatPercent('20.00000000000012')).toBe('20.0000000000001200%');
    });
});
