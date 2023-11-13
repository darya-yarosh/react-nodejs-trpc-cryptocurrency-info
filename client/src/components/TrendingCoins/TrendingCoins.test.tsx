import { screen, render } from "@testing-library/react";

import TrendingCoins from "./TrendingCoins";
import Coin from "models/Coin";

describe('Trending Coins component module', () => {
    test('Has valid structure of childs', () => {
        const coins: Coin[] = [
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
            }
        ]
        render(<TrendingCoins
            coinList={coins}
        />)

        const trendingCoinsElement = screen.getByTestId('trendingCoins');
        expect(trendingCoinsElement.hasChildNodes()).toBeTruthy();

        expect(trendingCoinsElement).toContainHTML('h1');
        expect(trendingCoinsElement).toContainHTML('section');
        expect(trendingCoinsElement.childNodes[0]).toHaveTextContent('Trending coins');
        expect(trendingCoinsElement.childNodes[1].hasChildNodes()).toBeTruthy();
    })
    test('Empty list', () => {
        const coins: Coin[] = [];
        render(<TrendingCoins
            coinList={coins}
        />)

        const trendingCoinsElement = screen.getByTestId('trendingCoins');
        expect(trendingCoinsElement.childNodes[1].hasChildNodes()).toBeFalsy();
    })
    test('Not empty list', () => {
        const coins: Coin[] = [
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
        render(<TrendingCoins
            coinList={coins}
        />)

        const trendingCoinsElement = screen.getByTestId('trendingCoins');
        expect(trendingCoinsElement.childNodes[1].hasChildNodes()).toBeTruthy();
    })
});