import { describe, expect, test } from '@jest/globals';

import * as portfolioHelper from 'logic/utils/PortfolioHelper';

import { Portfolio, Transaction } from 'models/Portfolio';

describe('portfolio helper module', () => {
    const transactionList: Transaction[] = JSON.parse('[{"id":"c0e63545-9e70-4498-9299-f0282e1d0050","coinId":"bitcoin","coinCount":1,"coinPrice":35224.18},{"id":"0a144b01-8ecb-40ce-b243-6cbc62603c57","coinId":"xrp","coinCount":1,"coinPrice":0.68},{"id":"1530d156-8ace-4a52-ad9c-8b41f9bb6dde","coinId":"ethereum","coinCount":1,"coinPrice":1885.05121},{"id":"952a8f12-a647-4005-bc2a-f4c8930d8e6f","coinId":"bitcoin","coinCount":1,"coinPrice":35205.21},{"id":"11582978-3428-4656-ac70-6a7aa49c716b","coinId":"bitcoin","coinCount":1,"coinPrice":35205.21},{"id":"63f2dad0-570b-4c8d-b8b8-66fc2a996600","coinId":"bitcoin","coinCount":1,"coinPrice":35213.09},{"id":"03bbf089-9ed8-4d26-b332-ae191551c843","coinId":"bitcoin","coinCount":1,"coinPrice":35213.09},{"id":"8ac9d8a4-79a5-4645-86d1-bd8c57fed99e","coinId":"bitcoin","coinCount":3,"coinPrice":35242.03},{"id":"c4a72e10-b9f9-4001-95ea-828ccfbbe3d4","coinId":"bitcoin","coinCount":2,"coinPrice":35242.03},{"id":"37cc9163-64fe-4c8e-a3b6-0666166718f7","coinId":"xrp","coinCount":2,"coinPrice":0.69},{"id":"9e82099a-a16e-4d51-820c-bec111fafaf6","coinId":"solana","coinCount":3,"coinPrice":43.09}]')
    const portfolio: Portfolio = {
        transactionList: transactionList,
        favorites: []
    };

    test('getSpentAmount', () => {
        expect(portfolioHelper.getSpentAmount(portfolio)).toBe(354287.31121);
    });
    test('mapTransactionsByCoin', () => {
        const result = JSON.parse('[{"id":"bitcoin","amount":10,"moneySpent":352270.93},{"id":"xrp","amount":3,"moneySpent":2.06},{"id":"ethereum","amount":1,"moneySpent":1885.05121},{"id":"solana","amount":3,"moneySpent":129.27}]')
        expect(JSON.stringify(
            portfolioHelper.mapTransactionsByCoin(transactionList)
        )).toBe(JSON.stringify(
            result
        ));
    });
    test('getCoinsActualPrice', () => {
        const actualCoinList = JSON.parse('[{"id":"bitcoin","rank":1,"symbol":"BTC","name":"Bitcoin","supply":"19,537,356 BTC","maxSupply":"21,000,000 BTC","marketCapUsd":"$717,744,315,877","volumeUsd24Hr":"$7,403,733,778","priceUsd":"$36,737.02","changePercent24Hr":"3.90%","vwap24Hr":36306.843625479225,"logo":"images/coins/btc.svg"},{"id":"ethereum","rank":2,"symbol":"ETH","name":"Ethereum","supply":"120,266,597 ETH","maxSupply":"∞ ETH","marketCapUsd":"$229,605,277,269","volumeUsd24Hr":"$3,639,666,408","priceUsd":"$1,909.14","changePercent24Hr":"1.39%","vwap24Hr":1904.316045689661,"logo":"images/coins/eth.svg"},{"id":"xrp","rank":5,"symbol":"XRP","name":"XRP","supply":"45,404,028,640 XRP","maxSupply":"100,000,000,000 XRP","marketCapUsd":"$31,459,237,054","volumeUsd24Hr":"$798,252,236","priceUsd":"$0.69","changePercent24Hr":"-0.42%","vwap24Hr":0.6922064009050364,"logo":"images/coins/xrp.svg"},{"id":"solana","rank":7,"symbol":"SOL","name":"Solana","supply":"420,895,052 SOL","maxSupply":"∞ SOL","marketCapUsd":"$19,658,591,804","volumeUsd24Hr":"$547,868,798","priceUsd":"$46.71","changePercent24Hr":"8.03%","vwap24Hr":44.15541678588573,"logo":"images/coins/sol.svg"}]')
        const coinsSummary = JSON.parse('[{"id":"bitcoin","amount":10,"moneySpent":352270.93},{"id":"xrp","amount":3,"moneySpent":2.06},{"id":"ethereum","amount":1,"moneySpent":1885.05121},{"id":"solana","amount":3,"moneySpent":129.27}]')
        const result = JSON.parse('[{"coinId":"bitcoin","price":367370.19999999995},{"coinId":"xrp","price":2.07},{"coinId":"ethereum","price":1909.14},{"coinId":"solana","price":140.13}]');
        expect(JSON.stringify(
            portfolioHelper.getCoinsActualPrice(actualCoinList, coinsSummary)
        )).toBe(JSON.stringify(
            result
        ));
    });
});