import { describe, expect, test } from '@jest/globals';

import * as helper from 'logic/utils/Helper';

import Coin from 'models/Coin';
import { SortOrder } from 'models/Interface';

describe('helper module: format', () => {
    test('price to number', () => {
        expect(helper.priceToNumber('$27.00')).toBe(27.00);
        expect(helper.priceToNumber('$20,000.00')).toBe(20000.00);
        expect(helper.priceToNumber('$20,000.01')).toBe(20000.01);
        expect(helper.priceToNumber('$20,000.99')).toBe(20000.99);
    });
    test('percent to number', () => {
        expect(helper.percentToNumber('27%')).toBe(27);
        expect(helper.percentToNumber('20000%')).toBe(20000);
        expect(helper.percentToNumber('20000.01%')).toBe(20000.01);
        expect(helper.percentToNumber('20000.99%')).toBe(20000.99);
    });
    test('supply to number', () => {
        expect(helper.supplyToNumber('27 BTC', 'BTC')).toBe(27);
        expect(helper.supplyToNumber('20,000 BTC', 'BTC')).toBe(20000);
        expect(helper.supplyToNumber('20,000 BTC', 'BTC')).toBe(20000);
        expect(helper.supplyToNumber('20,001 BTC', 'BTC')).toBe(20001);
        expect(helper.supplyToNumber('∞', 'BTC')).toBe(Infinity);
    });
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

describe('helper module: coins', () => {
    const coinList: Coin[] = [
        {
            id: 'bitcoin',
            rank: 1,
            symbol: 'BTC',
            name: 'Bitcoin',
            supply: '19,535,737 BTC',
            maxSupply: '21,000,000 BTC',
            marketCapUsd: '$679,215,747,576',
            volumeUsd24Hr: '$5,266,226,965',
            priceUsd: '$34,767.86',
            changePercent24Hr: '-1.21%',
            vwap24Hr: 34831.2542269745017871,
            logo: 'images/coins/btc.svg'
        },
        {
            id: 'ethereum',
            rank: 2,
            symbol: 'ETH',
            name: 'Ethereum',
            supply: '120,268,345 ETH',
            maxSupply: '∞ ETH',
            marketCapUsd: '$225,313,773,633',
            volumeUsd24Hr: '$3,010,658,542',
            priceUsd: '$1,873.43',
            changePercent24Hr: '-1.98%',
            vwap24Hr: 1890.8095792344811291,
            logo: 'images/coins/eth.svg'
        },
        {
            id: 'tether',
            rank: 3,
            symbol: 'USDT',
            name: 'Tether',
            supply: '85,739,984,995 USDT',
            maxSupply: '∞ USDT',
            marketCapUsd: '$85,819,284,552',
            volumeUsd24Hr: '$10,424,636,853',
            priceUsd: '$1.0009249',
            changePercent24Hr: '-0.03%',
            vwap24Hr: 1.0006507364468657,
            logo: 'images/coins/usdt.svg'
        },
        {
            id: 'binance-coin',
            rank: 4,
            symbol: 'BNB',
            name: 'BNB',
            supply: '166,801,148 BNB',
            maxSupply: '166,801,148 BNB',
            marketCapUsd: '$40,953,463,707',
            volumeUsd24Hr: '$267,810,413',
            priceUsd: '$245.52',
            changePercent24Hr: '-2.94%',
            vwap24Hr: 250.9545681300573850,
            logo: 'images/coins/bnb.svg'
        },
        {
            id: 'xrp',
            rank: 5,
            symbol: 'XRP',
            name: 'XRP',
            supply: '45,404,028,640 XRP',
            maxSupply: '100,000,000,000 XRP',
            marketCapUsd: '$30,620,906,487',
            volumeUsd24Hr: '$1,068,655,675',
            priceUsd: '$0.67',
            changePercent24Hr: '-6.95%',
            vwap24Hr: 0.6958292095294246,
            logo: 'images/coins/xrp.svg'
        },
        {
            id: 'usd-coin',
            rank: 6,
            symbol: 'USDC',
            name: 'USDC',
            supply: '24,383,851,913 USDC',
            maxSupply: '∞ USDC',
            marketCapUsd: '$24,397,135,669',
            volumeUsd24Hr: '$936,058,762',
            priceUsd: '$1.0005448',
            changePercent24Hr: '0.04%',
            vwap24Hr: 1.0005493892258831,
            logo: 'images/coins/usdc.svg'
        },
        {
            id: 'solana',
            rank: 7,
            symbol: 'SOL',
            name: 'Solana',
            supply: '420,749,774 SOL',
            maxSupply: '∞ SOL',
            marketCapUsd: '$17,468,831,472',
            volumeUsd24Hr: '$403,133,865',
            priceUsd: '$41.52',
            changePercent24Hr: '2.13%',
            vwap24Hr: 41.1839193904809224,
            logo: 'images/coins/sol.svg'
        },
        {
            id: 'cardano',
            rank: 8,
            symbol: 'ADA',
            name: 'Cardano',
            supply: '35,258,569,229 ADA',
            maxSupply: '45,000,000,000 ADA',
            marketCapUsd: '$12,058,049,158',
            volumeUsd24Hr: '$180,051,255',
            priceUsd: '$0.34',
            changePercent24Hr: '-3.53%',
            vwap24Hr: 0.3583647809536260,
            logo: 'images/coins/ada.svg'
        },
        {
            id: 'dogecoin',
            rank: 9,
            symbol: 'DOGE',
            name: 'Dogecoin',
            supply: '141,733,006,384 DOGE',
            maxSupply: '∞ DOGE',
            marketCapUsd: '$10,294,762,956',
            volumeUsd24Hr: '$364,188,562',
            priceUsd: '$0.07263',
            changePercent24Hr: '-2.34%',
            vwap24Hr: 0.0747277468748004,
            logo: 'images/coins/doge.svg'
        },
        {
            id: 'tron',
            rank: 10,
            symbol: 'TRX',
            name: 'TRON',
            supply: '88,735,474,395 TRX',
            maxSupply: '∞ TRX',
            marketCapUsd: '$8,583,566,503',
            volumeUsd24Hr: '$86,501,306',
            priceUsd: '$0.09673',
            changePercent24Hr: '-2.40%',
            vwap24Hr: 0.0973951019542081,
            logo: 'images/coins/trx.svg'
        }
    ];

    test('Sorting by priceUsd', () => {
        const sortedCoinByPriceUsdAsc = [
            {
                id: 'dogecoin',
                rank: 9,
                symbol: 'DOGE',
                name: 'Dogecoin',
                supply: '141,733,006,384 DOGE',
                maxSupply: '∞ DOGE',
                marketCapUsd: '$10,294,762,956',
                volumeUsd24Hr: '$364,188,562',
                priceUsd: '$0.07263',
                changePercent24Hr: '-2.34%',
                vwap24Hr: 0.0747277468748004,
                logo: 'images/coins/doge.svg'
            },
            {
                id: 'tron',
                rank: 10,
                symbol: 'TRX',
                name: 'TRON',
                supply: '88,735,474,395 TRX',
                maxSupply: '∞ TRX',
                marketCapUsd: '$8,583,566,503',
                volumeUsd24Hr: '$86,501,306',
                priceUsd: '$0.09673',
                changePercent24Hr: '-2.40%',
                vwap24Hr: 0.0973951019542081,
                logo: 'images/coins/trx.svg'
            },
            {
                id: 'cardano',
                rank: 8,
                symbol: 'ADA',
                name: 'Cardano',
                supply: '35,258,569,229 ADA',
                maxSupply: '45,000,000,000 ADA',
                marketCapUsd: '$12,058,049,158',
                volumeUsd24Hr: '$180,051,255',
                priceUsd: '$0.34',
                changePercent24Hr: '-3.53%',
                vwap24Hr: 0.3583647809536260,
                logo: 'images/coins/ada.svg'
            },
            {
                id: 'xrp',
                rank: 5,
                symbol: 'XRP',
                name: 'XRP',
                supply: '45,404,028,640 XRP',
                maxSupply: '100,000,000,000 XRP',
                marketCapUsd: '$30,620,906,487',
                volumeUsd24Hr: '$1,068,655,675',
                priceUsd: '$0.67',
                changePercent24Hr: '-6.95%',
                vwap24Hr: 0.6958292095294246,
                logo: 'images/coins/xrp.svg'
            },
            {
                id: 'usd-coin',
                rank: 6,
                symbol: 'USDC',
                name: 'USDC',
                supply: '24,383,851,913 USDC',
                maxSupply: '∞ USDC',
                marketCapUsd: '$24,397,135,669',
                volumeUsd24Hr: '$936,058,762',
                priceUsd: '$1.0005448',
                changePercent24Hr: '0.04%',
                vwap24Hr: 1.0005493892258831,
                logo: 'images/coins/usdc.svg'
            },
            {
                id: 'tether',
                rank: 3,
                symbol: 'USDT',
                name: 'Tether',
                supply: '85,739,984,995 USDT',
                maxSupply: '∞ USDT',
                marketCapUsd: '$85,819,284,552',
                volumeUsd24Hr: '$10,424,636,853',
                priceUsd: '$1.0009249',
                changePercent24Hr: '-0.03%',
                vwap24Hr: 1.0006507364468657,
                logo: 'images/coins/usdt.svg'
            },
            {
                id: 'solana',
                rank: 7,
                symbol: 'SOL',
                name: 'Solana',
                supply: '420,749,774 SOL',
                maxSupply: '∞ SOL',
                marketCapUsd: '$17,468,831,472',
                volumeUsd24Hr: '$403,133,865',
                priceUsd: '$41.52',
                changePercent24Hr: '2.13%',
                vwap24Hr: 41.1839193904809224,
                logo: 'images/coins/sol.svg'
            },
            {
                id: 'binance-coin',
                rank: 4,
                symbol: 'BNB',
                name: 'BNB',
                supply: '166,801,148 BNB',
                maxSupply: '166,801,148 BNB',
                marketCapUsd: '$40,953,463,707',
                volumeUsd24Hr: '$267,810,413',
                priceUsd: '$245.52',
                changePercent24Hr: '-2.94%',
                vwap24Hr: 250.9545681300573850,
                logo: 'images/coins/bnb.svg'
            },
            {
                id: 'ethereum',
                rank: 2,
                symbol: 'ETH',
                name: 'Ethereum',
                supply: '120,268,345 ETH',
                maxSupply: '∞ ETH',
                marketCapUsd: '$225,313,773,633',
                volumeUsd24Hr: '$3,010,658,542',
                priceUsd: '$1,873.43',
                changePercent24Hr: '-1.98%',
                vwap24Hr: 1890.8095792344811291,
                logo: 'images/coins/eth.svg'
            },
            {
                id: 'bitcoin',
                rank: 1,
                symbol: 'BTC',
                name: 'Bitcoin',
                supply: '19,535,737 BTC',
                maxSupply: '21,000,000 BTC',
                marketCapUsd: '$679,215,747,576',
                volumeUsd24Hr: '$5,266,226,965',
                priceUsd: '$34,767.86',
                changePercent24Hr: '-1.21%',
                vwap24Hr: 34831.2542269745017871,
                logo: 'images/coins/btc.svg'
            },
        ];
        expect(JSON.stringify(
            helper.sortCoinList(coinList, helper.CoinListSortType.priceUsd, SortOrder.asc)
        )).toBe(JSON.stringify(sortedCoinByPriceUsdAsc));

        const sortedCoinByPriceUsdDesc = [
            {
                id: 'bitcoin',
                rank: 1,
                symbol: 'BTC',
                name: 'Bitcoin',
                supply: '19,535,737 BTC',
                maxSupply: '21,000,000 BTC',
                marketCapUsd: '$679,215,747,576',
                volumeUsd24Hr: '$5,266,226,965',
                priceUsd: '$34,767.86',
                changePercent24Hr: '-1.21%',
                vwap24Hr: 34831.2542269745017871,
                logo: 'images/coins/btc.svg'
            },
            {
                id: 'ethereum',
                rank: 2,
                symbol: 'ETH',
                name: 'Ethereum',
                supply: '120,268,345 ETH',
                maxSupply: '∞ ETH',
                marketCapUsd: '$225,313,773,633',
                volumeUsd24Hr: '$3,010,658,542',
                priceUsd: '$1,873.43',
                changePercent24Hr: '-1.98%',
                vwap24Hr: 1890.8095792344811291,
                logo: 'images/coins/eth.svg'
            },
            {
                id: 'binance-coin',
                rank: 4,
                symbol: 'BNB',
                name: 'BNB',
                supply: '166,801,148 BNB',
                maxSupply: '166,801,148 BNB',
                marketCapUsd: '$40,953,463,707',
                volumeUsd24Hr: '$267,810,413',
                priceUsd: '$245.52',
                changePercent24Hr: '-2.94%',
                vwap24Hr: 250.9545681300573850,
                logo: 'images/coins/bnb.svg'
            },
            {
                id: 'solana',
                rank: 7,
                symbol: 'SOL',
                name: 'Solana',
                supply: '420,749,774 SOL',
                maxSupply: '∞ SOL',
                marketCapUsd: '$17,468,831,472',
                volumeUsd24Hr: '$403,133,865',
                priceUsd: '$41.52',
                changePercent24Hr: '2.13%',
                vwap24Hr: 41.1839193904809224,
                logo: 'images/coins/sol.svg'
            },
            {
                id: 'tether',
                rank: 3,
                symbol: 'USDT',
                name: 'Tether',
                supply: '85,739,984,995 USDT',
                maxSupply: '∞ USDT',
                marketCapUsd: '$85,819,284,552',
                volumeUsd24Hr: '$10,424,636,853',
                priceUsd: '$1.0009249',
                changePercent24Hr: '-0.03%',
                vwap24Hr: 1.0006507364468657,
                logo: 'images/coins/usdt.svg'
            },
            {
                id: 'usd-coin',
                rank: 6,
                symbol: 'USDC',
                name: 'USDC',
                supply: '24,383,851,913 USDC',
                maxSupply: '∞ USDC',
                marketCapUsd: '$24,397,135,669',
                volumeUsd24Hr: '$936,058,762',
                priceUsd: '$1.0005448',
                changePercent24Hr: '0.04%',
                vwap24Hr: 1.0005493892258831,
                logo: 'images/coins/usdc.svg'
            },
            {
                id: 'xrp',
                rank: 5,
                symbol: 'XRP',
                name: 'XRP',
                supply: '45,404,028,640 XRP',
                maxSupply: '100,000,000,000 XRP',
                marketCapUsd: '$30,620,906,487',
                volumeUsd24Hr: '$1,068,655,675',
                priceUsd: '$0.67',
                changePercent24Hr: '-6.95%',
                vwap24Hr: 0.6958292095294246,
                logo: 'images/coins/xrp.svg'
            },
            {
                id: 'cardano',
                rank: 8,
                symbol: 'ADA',
                name: 'Cardano',
                supply: '35,258,569,229 ADA',
                maxSupply: '45,000,000,000 ADA',
                marketCapUsd: '$12,058,049,158',
                volumeUsd24Hr: '$180,051,255',
                priceUsd: '$0.34',
                changePercent24Hr: '-3.53%',
                vwap24Hr: 0.3583647809536260,
                logo: 'images/coins/ada.svg'
            },
            {
                id: 'tron',
                rank: 10,
                symbol: 'TRX',
                name: 'TRON',
                supply: '88,735,474,395 TRX',
                maxSupply: '∞ TRX',
                marketCapUsd: '$8,583,566,503',
                volumeUsd24Hr: '$86,501,306',
                priceUsd: '$0.09673',
                changePercent24Hr: '-2.40%',
                vwap24Hr: 0.0973951019542081,
                logo: 'images/coins/trx.svg'
            },
            {
                id: 'dogecoin',
                rank: 9,
                symbol: 'DOGE',
                name: 'Dogecoin',
                supply: '141,733,006,384 DOGE',
                maxSupply: '∞ DOGE',
                marketCapUsd: '$10,294,762,956',
                volumeUsd24Hr: '$364,188,562',
                priceUsd: '$0.07263',
                changePercent24Hr: '-2.34%',
                vwap24Hr: 0.0747277468748004,
                logo: 'images/coins/doge.svg'
            },
        ];
        expect(JSON.stringify(
            helper.sortCoinList(coinList, helper.CoinListSortType.priceUsd, SortOrder.desc)
        )).toBe(JSON.stringify(sortedCoinByPriceUsdDesc));
    });
    test('Sorting by marketCapUsd', () => {
        const sortedCoinByMarketCapUsdAsc = [
            {
                id: 'tron',
                rank: 10,
                symbol: 'TRX',
                name: 'TRON',
                supply: '88,735,474,395 TRX',
                maxSupply: '∞ TRX',
                marketCapUsd: '$8,583,566,503',
                volumeUsd24Hr: '$86,501,306',
                priceUsd: '$0.09673',
                changePercent24Hr: '-2.40%',
                vwap24Hr: 0.0973951019542081,
                logo: 'images/coins/trx.svg'
            },
            {
                id: 'dogecoin',
                rank: 9,
                symbol: 'DOGE',
                name: 'Dogecoin',
                supply: '141,733,006,384 DOGE',
                maxSupply: '∞ DOGE',
                marketCapUsd: '$10,294,762,956',
                volumeUsd24Hr: '$364,188,562',
                priceUsd: '$0.07263',
                changePercent24Hr: '-2.34%',
                vwap24Hr: 0.0747277468748004,
                logo: 'images/coins/doge.svg'
            },
            {
                id: 'cardano',
                rank: 8,
                symbol: 'ADA',
                name: 'Cardano',
                supply: '35,258,569,229 ADA',
                maxSupply: '45,000,000,000 ADA',
                marketCapUsd: '$12,058,049,158',
                volumeUsd24Hr: '$180,051,255',
                priceUsd: '$0.34',
                changePercent24Hr: '-3.53%',
                vwap24Hr: 0.3583647809536260,
                logo: 'images/coins/ada.svg'
            },
            {
                id: 'solana',
                rank: 7,
                symbol: 'SOL',
                name: 'Solana',
                supply: '420,749,774 SOL',
                maxSupply: '∞ SOL',
                marketCapUsd: '$17,468,831,472',
                volumeUsd24Hr: '$403,133,865',
                priceUsd: '$41.52',
                changePercent24Hr: '2.13%',
                vwap24Hr: 41.1839193904809224,
                logo: 'images/coins/sol.svg'
            },
            {
                id: 'usd-coin',
                rank: 6,
                symbol: 'USDC',
                name: 'USDC',
                supply: '24,383,851,913 USDC',
                maxSupply: '∞ USDC',
                marketCapUsd: '$24,397,135,669',
                volumeUsd24Hr: '$936,058,762',
                priceUsd: '$1.0005448',
                changePercent24Hr: '0.04%',
                vwap24Hr: 1.0005493892258831,
                logo: 'images/coins/usdc.svg'
            },
            {
                id: 'xrp',
                rank: 5,
                symbol: 'XRP',
                name: 'XRP',
                supply: '45,404,028,640 XRP',
                maxSupply: '100,000,000,000 XRP',
                marketCapUsd: '$30,620,906,487',
                volumeUsd24Hr: '$1,068,655,675',
                priceUsd: '$0.67',
                changePercent24Hr: '-6.95%',
                vwap24Hr: 0.6958292095294246,
                logo: 'images/coins/xrp.svg'
            },
            {
                id: 'binance-coin',
                rank: 4,
                symbol: 'BNB',
                name: 'BNB',
                supply: '166,801,148 BNB',
                maxSupply: '166,801,148 BNB',
                marketCapUsd: '$40,953,463,707',
                volumeUsd24Hr: '$267,810,413',
                priceUsd: '$245.52',
                changePercent24Hr: '-2.94%',
                vwap24Hr: 250.9545681300573850,
                logo: 'images/coins/bnb.svg'
            },
            {
                id: 'tether',
                rank: 3,
                symbol: 'USDT',
                name: 'Tether',
                supply: '85,739,984,995 USDT',
                maxSupply: '∞ USDT',
                marketCapUsd: '$85,819,284,552',
                volumeUsd24Hr: '$10,424,636,853',
                priceUsd: '$1.0009249',
                changePercent24Hr: '-0.03%',
                vwap24Hr: 1.0006507364468657,
                logo: 'images/coins/usdt.svg'
            },
            {
                id: 'ethereum',
                rank: 2,
                symbol: 'ETH',
                name: 'Ethereum',
                supply: '120,268,345 ETH',
                maxSupply: '∞ ETH',
                marketCapUsd: '$225,313,773,633',
                volumeUsd24Hr: '$3,010,658,542',
                priceUsd: '$1,873.43',
                changePercent24Hr: '-1.98%',
                vwap24Hr: 1890.8095792344811291,
                logo: 'images/coins/eth.svg'
            },
            {
                id: 'bitcoin',
                rank: 1,
                symbol: 'BTC',
                name: 'Bitcoin',
                supply: '19,535,737 BTC',
                maxSupply: '21,000,000 BTC',
                marketCapUsd: '$679,215,747,576',
                volumeUsd24Hr: '$5,266,226,965',
                priceUsd: '$34,767.86',
                changePercent24Hr: '-1.21%',
                vwap24Hr: 34831.2542269745017871,
                logo: 'images/coins/btc.svg'
            },
        ];
        expect(JSON.stringify(
            helper.sortCoinList(coinList, helper.CoinListSortType.marketCapUsd, SortOrder.asc)
        )).toBe(JSON.stringify(sortedCoinByMarketCapUsdAsc));

        const sortedCoinByMarketCapUsdDesc = [
            {
                id: 'bitcoin',
                rank: 1,
                symbol: 'BTC',
                name: 'Bitcoin',
                supply: '19,535,737 BTC',
                maxSupply: '21,000,000 BTC',
                marketCapUsd: '$679,215,747,576',
                volumeUsd24Hr: '$5,266,226,965',
                priceUsd: '$34,767.86',
                changePercent24Hr: '-1.21%',
                vwap24Hr: 34831.2542269745017871,
                logo: 'images/coins/btc.svg'
            },
            {
                id: 'ethereum',
                rank: 2,
                symbol: 'ETH',
                name: 'Ethereum',
                supply: '120,268,345 ETH',
                maxSupply: '∞ ETH',
                marketCapUsd: '$225,313,773,633',
                volumeUsd24Hr: '$3,010,658,542',
                priceUsd: '$1,873.43',
                changePercent24Hr: '-1.98%',
                vwap24Hr: 1890.8095792344811291,
                logo: 'images/coins/eth.svg'
            },
            {
                id: 'tether',
                rank: 3,
                symbol: 'USDT',
                name: 'Tether',
                supply: '85,739,984,995 USDT',
                maxSupply: '∞ USDT',
                marketCapUsd: '$85,819,284,552',
                volumeUsd24Hr: '$10,424,636,853',
                priceUsd: '$1.0009249',
                changePercent24Hr: '-0.03%',
                vwap24Hr: 1.0006507364468657,
                logo: 'images/coins/usdt.svg'
            },
            {
                id: 'binance-coin',
                rank: 4,
                symbol: 'BNB',
                name: 'BNB',
                supply: '166,801,148 BNB',
                maxSupply: '166,801,148 BNB',
                marketCapUsd: '$40,953,463,707',
                volumeUsd24Hr: '$267,810,413',
                priceUsd: '$245.52',
                changePercent24Hr: '-2.94%',
                vwap24Hr: 250.9545681300573850,
                logo: 'images/coins/bnb.svg'
            },
            {
                id: 'xrp',
                rank: 5,
                symbol: 'XRP',
                name: 'XRP',
                supply: '45,404,028,640 XRP',
                maxSupply: '100,000,000,000 XRP',
                marketCapUsd: '$30,620,906,487',
                volumeUsd24Hr: '$1,068,655,675',
                priceUsd: '$0.67',
                changePercent24Hr: '-6.95%',
                vwap24Hr: 0.6958292095294246,
                logo: 'images/coins/xrp.svg'
            },
            {
                id: 'usd-coin',
                rank: 6,
                symbol: 'USDC',
                name: 'USDC',
                supply: '24,383,851,913 USDC',
                maxSupply: '∞ USDC',
                marketCapUsd: '$24,397,135,669',
                volumeUsd24Hr: '$936,058,762',
                priceUsd: '$1.0005448',
                changePercent24Hr: '0.04%',
                vwap24Hr: 1.0005493892258831,
                logo: 'images/coins/usdc.svg'
            },
            {
                id: 'solana',
                rank: 7,
                symbol: 'SOL',
                name: 'Solana',
                supply: '420,749,774 SOL',
                maxSupply: '∞ SOL',
                marketCapUsd: '$17,468,831,472',
                volumeUsd24Hr: '$403,133,865',
                priceUsd: '$41.52',
                changePercent24Hr: '2.13%',
                vwap24Hr: 41.1839193904809224,
                logo: 'images/coins/sol.svg'
            },
            {
                id: 'cardano',
                rank: 8,
                symbol: 'ADA',
                name: 'Cardano',
                supply: '35,258,569,229 ADA',
                maxSupply: '45,000,000,000 ADA',
                marketCapUsd: '$12,058,049,158',
                volumeUsd24Hr: '$180,051,255',
                priceUsd: '$0.34',
                changePercent24Hr: '-3.53%',
                vwap24Hr: 0.3583647809536260,
                logo: 'images/coins/ada.svg'
            },
            {
                id: 'dogecoin',
                rank: 9,
                symbol: 'DOGE',
                name: 'Dogecoin',
                supply: '141,733,006,384 DOGE',
                maxSupply: '∞ DOGE',
                marketCapUsd: '$10,294,762,956',
                volumeUsd24Hr: '$364,188,562',
                priceUsd: '$0.07263',
                changePercent24Hr: '-2.34%',
                vwap24Hr: 0.0747277468748004,
                logo: 'images/coins/doge.svg'
            },
            {
                id: 'tron',
                rank: 10,
                symbol: 'TRX',
                name: 'TRON',
                supply: '88,735,474,395 TRX',
                maxSupply: '∞ TRX',
                marketCapUsd: '$8,583,566,503',
                volumeUsd24Hr: '$86,501,306',
                priceUsd: '$0.09673',
                changePercent24Hr: '-2.40%',
                vwap24Hr: 0.0973951019542081,
                logo: 'images/coins/trx.svg'
            }
        ];
        expect(JSON.stringify(
            helper.sortCoinList(coinList, helper.CoinListSortType.marketCapUsd, SortOrder.desc)
        )).toBe(JSON.stringify(sortedCoinByMarketCapUsdDesc));
    });
    test('Sorting by changePercent24Hr', () => {
        const sortedCoinByPercent24HrAsc = [
            {
                id: 'xrp',
                rank: 5,
                symbol: 'XRP',
                name: 'XRP',
                supply: '45,404,028,640 XRP',
                maxSupply: '100,000,000,000 XRP',
                marketCapUsd: '$30,620,906,487',
                volumeUsd24Hr: '$1,068,655,675',
                priceUsd: '$0.67',
                changePercent24Hr: '-6.95%',
                vwap24Hr: 0.6958292095294246,
                logo: 'images/coins/xrp.svg'
            },
            {
                id: 'cardano',
                rank: 8,
                symbol: 'ADA',
                name: 'Cardano',
                supply: '35,258,569,229 ADA',
                maxSupply: '45,000,000,000 ADA',
                marketCapUsd: '$12,058,049,158',
                volumeUsd24Hr: '$180,051,255',
                priceUsd: '$0.34',
                changePercent24Hr: '-3.53%',
                vwap24Hr: 0.3583647809536260,
                logo: 'images/coins/ada.svg'
            },
            {
                id: 'binance-coin',
                rank: 4,
                symbol: 'BNB',
                name: 'BNB',
                supply: '166,801,148 BNB',
                maxSupply: '166,801,148 BNB',
                marketCapUsd: '$40,953,463,707',
                volumeUsd24Hr: '$267,810,413',
                priceUsd: '$245.52',
                changePercent24Hr: '-2.94%',
                vwap24Hr: 250.9545681300573850,
                logo: 'images/coins/bnb.svg'
            },
            {
                id: 'tron',
                rank: 10,
                symbol: 'TRX',
                name: 'TRON',
                supply: '88,735,474,395 TRX',
                maxSupply: '∞ TRX',
                marketCapUsd: '$8,583,566,503',
                volumeUsd24Hr: '$86,501,306',
                priceUsd: '$0.09673',
                changePercent24Hr: '-2.40%',
                vwap24Hr: 0.0973951019542081,
                logo: 'images/coins/trx.svg'
            },
            {
                id: 'dogecoin',
                rank: 9,
                symbol: 'DOGE',
                name: 'Dogecoin',
                supply: '141,733,006,384 DOGE',
                maxSupply: '∞ DOGE',
                marketCapUsd: '$10,294,762,956',
                volumeUsd24Hr: '$364,188,562',
                priceUsd: '$0.07263',
                changePercent24Hr: '-2.34%',
                vwap24Hr: 0.0747277468748004,
                logo: 'images/coins/doge.svg'
            },
            {
                id: 'ethereum',
                rank: 2,
                symbol: 'ETH',
                name: 'Ethereum',
                supply: '120,268,345 ETH',
                maxSupply: '∞ ETH',
                marketCapUsd: '$225,313,773,633',
                volumeUsd24Hr: '$3,010,658,542',
                priceUsd: '$1,873.43',
                changePercent24Hr: '-1.98%',
                vwap24Hr: 1890.8095792344811291,
                logo: 'images/coins/eth.svg'
            },
            {
                id: 'bitcoin',
                rank: 1,
                symbol: 'BTC',
                name: 'Bitcoin',
                supply: '19,535,737 BTC',
                maxSupply: '21,000,000 BTC',
                marketCapUsd: '$679,215,747,576',
                volumeUsd24Hr: '$5,266,226,965',
                priceUsd: '$34,767.86',
                changePercent24Hr: '-1.21%',
                vwap24Hr: 34831.2542269745017871,
                logo: 'images/coins/btc.svg'
            },
            {
                id: 'tether',
                rank: 3,
                symbol: 'USDT',
                name: 'Tether',
                supply: '85,739,984,995 USDT',
                maxSupply: '∞ USDT',
                marketCapUsd: '$85,819,284,552',
                volumeUsd24Hr: '$10,424,636,853',
                priceUsd: '$1.0009249',
                changePercent24Hr: '-0.03%',
                vwap24Hr: 1.0006507364468657,
                logo: 'images/coins/usdt.svg'
            },
            {
                id: 'usd-coin',
                rank: 6,
                symbol: 'USDC',
                name: 'USDC',
                supply: '24,383,851,913 USDC',
                maxSupply: '∞ USDC',
                marketCapUsd: '$24,397,135,669',
                volumeUsd24Hr: '$936,058,762',
                priceUsd: '$1.0005448',
                changePercent24Hr: '0.04%',
                vwap24Hr: 1.0005493892258831,
                logo: 'images/coins/usdc.svg'
            },
            {
                id: 'solana',
                rank: 7,
                symbol: 'SOL',
                name: 'Solana',
                supply: '420,749,774 SOL',
                maxSupply: '∞ SOL',
                marketCapUsd: '$17,468,831,472',
                volumeUsd24Hr: '$403,133,865',
                priceUsd: '$41.52',
                changePercent24Hr: '2.13%',
                vwap24Hr: 41.1839193904809224,
                logo: 'images/coins/sol.svg'
            },
        ];
        expect(JSON.stringify(
            helper.sortCoinList(coinList, helper.CoinListSortType.changePercent24Hr, SortOrder.asc)
        )).toBe(JSON.stringify(sortedCoinByPercent24HrAsc));

        const sortedCoinByPercent24HrDesc = [
            {
                id: 'solana',
                rank: 7,
                symbol: 'SOL',
                name: 'Solana',
                supply: '420,749,774 SOL',
                maxSupply: '∞ SOL',
                marketCapUsd: '$17,468,831,472',
                volumeUsd24Hr: '$403,133,865',
                priceUsd: '$41.52',
                changePercent24Hr: '2.13%',
                vwap24Hr: 41.1839193904809224,
                logo: 'images/coins/sol.svg'
            },
            {
                id: 'usd-coin',
                rank: 6,
                symbol: 'USDC',
                name: 'USDC',
                supply: '24,383,851,913 USDC',
                maxSupply: '∞ USDC',
                marketCapUsd: '$24,397,135,669',
                volumeUsd24Hr: '$936,058,762',
                priceUsd: '$1.0005448',
                changePercent24Hr: '0.04%',
                vwap24Hr: 1.0005493892258831,
                logo: 'images/coins/usdc.svg'
            },
            {
                id: 'tether',
                rank: 3,
                symbol: 'USDT',
                name: 'Tether',
                supply: '85,739,984,995 USDT',
                maxSupply: '∞ USDT',
                marketCapUsd: '$85,819,284,552',
                volumeUsd24Hr: '$10,424,636,853',
                priceUsd: '$1.0009249',
                changePercent24Hr: '-0.03%',
                vwap24Hr: 1.0006507364468657,
                logo: 'images/coins/usdt.svg'
            },
            {
                id: 'bitcoin',
                rank: 1,
                symbol: 'BTC',
                name: 'Bitcoin',
                supply: '19,535,737 BTC',
                maxSupply: '21,000,000 BTC',
                marketCapUsd: '$679,215,747,576',
                volumeUsd24Hr: '$5,266,226,965',
                priceUsd: '$34,767.86',
                changePercent24Hr: '-1.21%',
                vwap24Hr: 34831.2542269745017871,
                logo: 'images/coins/btc.svg'
            },
            {
                id: 'ethereum',
                rank: 2,
                symbol: 'ETH',
                name: 'Ethereum',
                supply: '120,268,345 ETH',
                maxSupply: '∞ ETH',
                marketCapUsd: '$225,313,773,633',
                volumeUsd24Hr: '$3,010,658,542',
                priceUsd: '$1,873.43',
                changePercent24Hr: '-1.98%',
                vwap24Hr: 1890.8095792344811291,
                logo: 'images/coins/eth.svg'
            },
            {
                id: 'dogecoin',
                rank: 9,
                symbol: 'DOGE',
                name: 'Dogecoin',
                supply: '141,733,006,384 DOGE',
                maxSupply: '∞ DOGE',
                marketCapUsd: '$10,294,762,956',
                volumeUsd24Hr: '$364,188,562',
                priceUsd: '$0.07263',
                changePercent24Hr: '-2.34%',
                vwap24Hr: 0.0747277468748004,
                logo: 'images/coins/doge.svg'
            },
            {
                id: 'tron',
                rank: 10,
                symbol: 'TRX',
                name: 'TRON',
                supply: '88,735,474,395 TRX',
                maxSupply: '∞ TRX',
                marketCapUsd: '$8,583,566,503',
                volumeUsd24Hr: '$86,501,306',
                priceUsd: '$0.09673',
                changePercent24Hr: '-2.40%',
                vwap24Hr: 0.0973951019542081,
                logo: 'images/coins/trx.svg'
            },
            {
                id: 'binance-coin',
                rank: 4,
                symbol: 'BNB',
                name: 'BNB',
                supply: '166,801,148 BNB',
                maxSupply: '166,801,148 BNB',
                marketCapUsd: '$40,953,463,707',
                volumeUsd24Hr: '$267,810,413',
                priceUsd: '$245.52',
                changePercent24Hr: '-2.94%',
                vwap24Hr: 250.9545681300573850,
                logo: 'images/coins/bnb.svg'
            },
            {
                id: 'cardano',
                rank: 8,
                symbol: 'ADA',
                name: 'Cardano',
                supply: '35,258,569,229 ADA',
                maxSupply: '45,000,000,000 ADA',
                marketCapUsd: '$12,058,049,158',
                volumeUsd24Hr: '$180,051,255',
                priceUsd: '$0.34',
                changePercent24Hr: '-3.53%',
                vwap24Hr: 0.3583647809536260,
                logo: 'images/coins/ada.svg'
            },
            {
                id: 'xrp',
                rank: 5,
                symbol: 'XRP',
                name: 'XRP',
                supply: '45,404,028,640 XRP',
                maxSupply: '100,000,000,000 XRP',
                marketCapUsd: '$30,620,906,487',
                volumeUsd24Hr: '$1,068,655,675',
                priceUsd: '$0.67',
                changePercent24Hr: '-6.95%',
                vwap24Hr: 0.6958292095294246,
                logo: 'images/coins/xrp.svg'
            },
        ];
        expect(JSON.stringify(
            helper.sortCoinList(coinList, helper.CoinListSortType.changePercent24Hr, SortOrder.desc)
        )).toBe(JSON.stringify(sortedCoinByPercent24HrDesc));
    });
    test('Sorting by rank', () => {
        const sortedCoinByRankAsc = [
            {
                id: 'bitcoin',
                rank: 1,
                symbol: 'BTC',
                name: 'Bitcoin',
                supply: '19,535,737 BTC',
                maxSupply: '21,000,000 BTC',
                marketCapUsd: '$679,215,747,576',
                volumeUsd24Hr: '$5,266,226,965',
                priceUsd: '$34,767.86',
                changePercent24Hr: '-1.21%',
                vwap24Hr: 34831.2542269745017871,
                logo: 'images/coins/btc.svg'
            },
            {
                id: 'ethereum',
                rank: 2,
                symbol: 'ETH',
                name: 'Ethereum',
                supply: '120,268,345 ETH',
                maxSupply: '∞ ETH',
                marketCapUsd: '$225,313,773,633',
                volumeUsd24Hr: '$3,010,658,542',
                priceUsd: '$1,873.43',
                changePercent24Hr: '-1.98%',
                vwap24Hr: 1890.8095792344811291,
                logo: 'images/coins/eth.svg'
            },
            {
                id: 'tether',
                rank: 3,
                symbol: 'USDT',
                name: 'Tether',
                supply: '85,739,984,995 USDT',
                maxSupply: '∞ USDT',
                marketCapUsd: '$85,819,284,552',
                volumeUsd24Hr: '$10,424,636,853',
                priceUsd: '$1.0009249',
                changePercent24Hr: '-0.03%',
                vwap24Hr: 1.0006507364468657,
                logo: 'images/coins/usdt.svg'
            },
            {
                id: 'binance-coin',
                rank: 4,
                symbol: 'BNB',
                name: 'BNB',
                supply: '166,801,148 BNB',
                maxSupply: '166,801,148 BNB',
                marketCapUsd: '$40,953,463,707',
                volumeUsd24Hr: '$267,810,413',
                priceUsd: '$245.52',
                changePercent24Hr: '-2.94%',
                vwap24Hr: 250.9545681300573850,
                logo: 'images/coins/bnb.svg'
            },
            {
                id: 'xrp',
                rank: 5,
                symbol: 'XRP',
                name: 'XRP',
                supply: '45,404,028,640 XRP',
                maxSupply: '100,000,000,000 XRP',
                marketCapUsd: '$30,620,906,487',
                volumeUsd24Hr: '$1,068,655,675',
                priceUsd: '$0.67',
                changePercent24Hr: '-6.95%',
                vwap24Hr: 0.6958292095294246,
                logo: 'images/coins/xrp.svg'
            },
            {
                id: 'usd-coin',
                rank: 6,
                symbol: 'USDC',
                name: 'USDC',
                supply: '24,383,851,913 USDC',
                maxSupply: '∞ USDC',
                marketCapUsd: '$24,397,135,669',
                volumeUsd24Hr: '$936,058,762',
                priceUsd: '$1.0005448',
                changePercent24Hr: '0.04%',
                vwap24Hr: 1.0005493892258831,
                logo: 'images/coins/usdc.svg'
            },
            {
                id: 'solana',
                rank: 7,
                symbol: 'SOL',
                name: 'Solana',
                supply: '420,749,774 SOL',
                maxSupply: '∞ SOL',
                marketCapUsd: '$17,468,831,472',
                volumeUsd24Hr: '$403,133,865',
                priceUsd: '$41.52',
                changePercent24Hr: '2.13%',
                vwap24Hr: 41.1839193904809224,
                logo: 'images/coins/sol.svg'
            },
            {
                id: 'cardano',
                rank: 8,
                symbol: 'ADA',
                name: 'Cardano',
                supply: '35,258,569,229 ADA',
                maxSupply: '45,000,000,000 ADA',
                marketCapUsd: '$12,058,049,158',
                volumeUsd24Hr: '$180,051,255',
                priceUsd: '$0.34',
                changePercent24Hr: '-3.53%',
                vwap24Hr: 0.3583647809536260,
                logo: 'images/coins/ada.svg'
            },
            {
                id: 'dogecoin',
                rank: 9,
                symbol: 'DOGE',
                name: 'Dogecoin',
                supply: '141,733,006,384 DOGE',
                maxSupply: '∞ DOGE',
                marketCapUsd: '$10,294,762,956',
                volumeUsd24Hr: '$364,188,562',
                priceUsd: '$0.07263',
                changePercent24Hr: '-2.34%',
                vwap24Hr: 0.0747277468748004,
                logo: 'images/coins/doge.svg'
            },
            {
                id: 'tron',
                rank: 10,
                symbol: 'TRX',
                name: 'TRON',
                supply: '88,735,474,395 TRX',
                maxSupply: '∞ TRX',
                marketCapUsd: '$8,583,566,503',
                volumeUsd24Hr: '$86,501,306',
                priceUsd: '$0.09673',
                changePercent24Hr: '-2.40%',
                vwap24Hr: 0.0973951019542081,
                logo: 'images/coins/trx.svg'
            }
        ];
        expect(JSON.stringify(
            helper.sortCoinList(coinList, helper.CoinListSortType.rank, SortOrder.asc)
        )).toBe(JSON.stringify(sortedCoinByRankAsc));

        const sortedCoinByRankDesc = [
            {
                id: 'tron',
                rank: 10,
                symbol: 'TRX',
                name: 'TRON',
                supply: '88,735,474,395 TRX',
                maxSupply: '∞ TRX',
                marketCapUsd: '$8,583,566,503',
                volumeUsd24Hr: '$86,501,306',
                priceUsd: '$0.09673',
                changePercent24Hr: '-2.40%',
                vwap24Hr: 0.0973951019542081,
                logo: 'images/coins/trx.svg'
            },
            {
                id: 'dogecoin',
                rank: 9,
                symbol: 'DOGE',
                name: 'Dogecoin',
                supply: '141,733,006,384 DOGE',
                maxSupply: '∞ DOGE',
                marketCapUsd: '$10,294,762,956',
                volumeUsd24Hr: '$364,188,562',
                priceUsd: '$0.07263',
                changePercent24Hr: '-2.34%',
                vwap24Hr: 0.0747277468748004,
                logo: 'images/coins/doge.svg'
            },
            {
                id: 'cardano',
                rank: 8,
                symbol: 'ADA',
                name: 'Cardano',
                supply: '35,258,569,229 ADA',
                maxSupply: '45,000,000,000 ADA',
                marketCapUsd: '$12,058,049,158',
                volumeUsd24Hr: '$180,051,255',
                priceUsd: '$0.34',
                changePercent24Hr: '-3.53%',
                vwap24Hr: 0.3583647809536260,
                logo: 'images/coins/ada.svg'
            },
            {
                id: 'solana',
                rank: 7,
                symbol: 'SOL',
                name: 'Solana',
                supply: '420,749,774 SOL',
                maxSupply: '∞ SOL',
                marketCapUsd: '$17,468,831,472',
                volumeUsd24Hr: '$403,133,865',
                priceUsd: '$41.52',
                changePercent24Hr: '2.13%',
                vwap24Hr: 41.1839193904809224,
                logo: 'images/coins/sol.svg'
            },
            {
                id: 'usd-coin',
                rank: 6,
                symbol: 'USDC',
                name: 'USDC',
                supply: '24,383,851,913 USDC',
                maxSupply: '∞ USDC',
                marketCapUsd: '$24,397,135,669',
                volumeUsd24Hr: '$936,058,762',
                priceUsd: '$1.0005448',
                changePercent24Hr: '0.04%',
                vwap24Hr: 1.0005493892258831,
                logo: 'images/coins/usdc.svg'
            },

            {
                id: 'xrp',
                rank: 5,
                symbol: 'XRP',
                name: 'XRP',
                supply: '45,404,028,640 XRP',
                maxSupply: '100,000,000,000 XRP',
                marketCapUsd: '$30,620,906,487',
                volumeUsd24Hr: '$1,068,655,675',
                priceUsd: '$0.67',
                changePercent24Hr: '-6.95%',
                vwap24Hr: 0.6958292095294246,
                logo: 'images/coins/xrp.svg'
            },
            {
                id: 'binance-coin',
                rank: 4,
                symbol: 'BNB',
                name: 'BNB',
                supply: '166,801,148 BNB',
                maxSupply: '166,801,148 BNB',
                marketCapUsd: '$40,953,463,707',
                volumeUsd24Hr: '$267,810,413',
                priceUsd: '$245.52',
                changePercent24Hr: '-2.94%',
                vwap24Hr: 250.9545681300573850,
                logo: 'images/coins/bnb.svg'
            },

            {
                id: 'tether',
                rank: 3,
                symbol: 'USDT',
                name: 'Tether',
                supply: '85,739,984,995 USDT',
                maxSupply: '∞ USDT',
                marketCapUsd: '$85,819,284,552',
                volumeUsd24Hr: '$10,424,636,853',
                priceUsd: '$1.0009249',
                changePercent24Hr: '-0.03%',
                vwap24Hr: 1.0006507364468657,
                logo: 'images/coins/usdt.svg'
            },
            {
                id: 'ethereum',
                rank: 2,
                symbol: 'ETH',
                name: 'Ethereum',
                supply: '120,268,345 ETH',
                maxSupply: '∞ ETH',
                marketCapUsd: '$225,313,773,633',
                volumeUsd24Hr: '$3,010,658,542',
                priceUsd: '$1,873.43',
                changePercent24Hr: '-1.98%',
                vwap24Hr: 1890.8095792344811291,
                logo: 'images/coins/eth.svg'
            },
            {
                id: 'bitcoin',
                rank: 1,
                symbol: 'BTC',
                name: 'Bitcoin',
                supply: '19,535,737 BTC',
                maxSupply: '21,000,000 BTC',
                marketCapUsd: '$679,215,747,576',
                volumeUsd24Hr: '$5,266,226,965',
                priceUsd: '$34,767.86',
                changePercent24Hr: '-1.21%',
                vwap24Hr: 34831.2542269745017871,
                logo: 'images/coins/btc.svg'
            },
        ];
        expect(JSON.stringify(
            helper.sortCoinList(coinList, helper.CoinListSortType.rank, SortOrder.desc)
        )).toBe(JSON.stringify(sortedCoinByRankDesc));
    });
    test('Sorting by invalid sort type', () => {
        expect(JSON.stringify(
            helper.sortCoinList(coinList, 'invalid' as helper.CoinListSortType, SortOrder.desc)
        )).toBe(JSON.stringify(coinList));
    });
});

describe('helper module: date', () => {
    test('get date day ago', () => {
        const date = new Date('11.07.2023');
        const dateAgo = new Date('11.06.2023');
        expect(helper.getDateDayAgo(date).toString()).toBe(dateAgo.toString());
    });
    test('get date week ago', () => {
        const date = new Date('11.07.2023');
        const dateAgo = new Date('10.31.2023');
        expect(helper.getDateWeekAgo(date).toString()).toBe(dateAgo.toString());
    });
    test('get date month ago', () => {
        const date = new Date('11.07.2023');
        const dateAgo = new Date('10.07.2023');
        expect(helper.getDateMonthAgo(date).toString()).toBe(dateAgo.toString());
    });
});
