"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("@trpc/server");
var helper_1 = require("./logic/helper");
var API = "https://api.coincap.io/v2";
var trpc = server_1.initTRPC.create();
var appRouter = trpc.router({
    getCoinList: trpc.procedure
        .input(function (value) {
        var valueAsType = value;
        var isValidObject = value !== null
            && typeof value === 'object';
        var isValidSearch = (value === null || value === void 0 ? void 0 : value.hasOwnProperty('search'))
            && (valueAsType.search === null
                || typeof valueAsType.search === 'string');
        var isValidIds = (value === null || value === void 0 ? void 0 : value.hasOwnProperty('ids'))
            && (typeof valueAsType.ids === null
                || typeof valueAsType.ids === 'object');
        var isValidOffset = (value === null || value === void 0 ? void 0 : value.hasOwnProperty('offset'))
            && (valueAsType.offset === null
                || typeof valueAsType.offset === 'number');
        var isValidLimit = (value === null || value === void 0 ? void 0 : value.hasOwnProperty('limit'))
            && (valueAsType.limit === null
                || typeof valueAsType.limit === 'number');
        if (isValidObject
            && isValidSearch
            && isValidIds
            && isValidOffset
            && isValidLimit) {
            return value;
        }
        throw new Error('Error[getCoinList]: Input is not a valid object.');
    })
        .query(function (opts) { return __awaiter(void 0, void 0, void 0, function () {
        var input, search, ids, offset, limit, requestOptions, url, apiUrl, dataInfo, coinList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    input = opts.input;
                    search = input.search, ids = input.ids, offset = input.offset, limit = input.limit;
                    requestOptions = {
                        method: "GET",
                        redirect: "follow",
                    };
                    url = API + "/assets?";
                    if (search !== null) {
                        url += "search=".concat(search, "&");
                    }
                    if (ids !== null) {
                        url += "ids=".concat(ids.join(), "&");
                    }
                    if (offset !== null && limit !== null) {
                        url += "offset=".concat(offset, "&limit=").concat(limit, "&");
                    }
                    ;
                    return [4 /*yield*/, fetch(url, requestOptions)];
                case 1:
                    apiUrl = _a.sent();
                    return [4 /*yield*/, apiUrl.json()];
                case 2:
                    dataInfo = _a.sent();
                    coinList = dataInfo.data.map(function (storageCoin) {
                        var maxSupply = storageCoin.maxSupply === null ? Infinity : storageCoin.maxSupply;
                        var coin = {
                            id: storageCoin.id,
                            rank: Number(storageCoin.rank),
                            symbol: storageCoin.symbol,
                            name: storageCoin.name,
                            supply: (0, helper_1.formatSupply)(storageCoin.supply, storageCoin.symbol),
                            maxSupply: (0, helper_1.formatSupply)(maxSupply, storageCoin.symbol),
                            marketCapUsd: (0, helper_1.formatMarketCap)(storageCoin.marketCapUsd),
                            volumeUsd24Hr: (0, helper_1.formatVolumeUsd24Hr)(storageCoin.volumeUsd24Hr),
                            priceUsd: (0, helper_1.formatPrice)(storageCoin.priceUsd),
                            changePercent24Hr: (0, helper_1.formatPercent)(storageCoin.changePercent24Hr),
                            vwap24Hr: storageCoin.vwap24Hr,
                            logo: "images/coins/".concat(storageCoin.symbol.toLowerCase(), ".svg"),
                        };
                        return coin;
                    });
                    return [2 /*return*/, coinList];
            }
        });
    }); }),
    getCoinById: trpc.procedure
        .input(function (id) {
        if (typeof id === 'string') {
            return id;
        }
        throw new Error('Error[getCoinById]: Input is not a string.');
    })
        .query(function (opts) { return __awaiter(void 0, void 0, void 0, function () {
        var id, requestOptions, apiUrl, dataInfo, storageCoin, coin;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = opts.input;
                    requestOptions = {
                        method: "GET",
                        redirect: "follow",
                    };
                    return [4 /*yield*/, fetch(API + "/assets/".concat(id), requestOptions)];
                case 1:
                    apiUrl = _a.sent();
                    return [4 /*yield*/, apiUrl.json()];
                case 2:
                    dataInfo = _a.sent();
                    storageCoin = dataInfo.data;
                    coin = {
                        id: storageCoin.id,
                        rank: Number(storageCoin.rank),
                        symbol: storageCoin.symbol,
                        name: storageCoin.name,
                        supply: (0, helper_1.formatSupply)(storageCoin.supply, storageCoin.symbol),
                        maxSupply: (0, helper_1.formatSupply)(storageCoin.maxSupply, storageCoin.symbol),
                        marketCapUsd: (0, helper_1.formatMarketCap)(storageCoin.marketCapUsd),
                        volumeUsd24Hr: (0, helper_1.formatVolumeUsd24Hr)(storageCoin.volumeUsd24Hr),
                        priceUsd: (0, helper_1.formatPrice)(storageCoin.priceUsd),
                        changePercent24Hr: (0, helper_1.formatPercent)(storageCoin.changePercent24Hr),
                        vwap24Hr: storageCoin.vwap24Hr,
                        logo: "images/coins/".concat(storageCoin.symbol.toLowerCase(), ".svg"),
                    };
                    return [2 /*return*/, coin];
            }
        });
    }); }),
    getCoinHistory: trpc.procedure
        .input(function (value) {
        var valueAsType = value;
        var isValidObject = value !== null
            && typeof value === 'object';
        var isValidId = (value === null || value === void 0 ? void 0 : value.hasOwnProperty('id'))
            && typeof valueAsType.id === 'string';
        var isValidInterval = (value === null || value === void 0 ? void 0 : value.hasOwnProperty('interval'))
            && typeof valueAsType.interval === 'string'
            && valueAsType.interval === valueAsType.interval;
        var isValidEnd = (value === null || value === void 0 ? void 0 : value.hasOwnProperty('end'))
            && (valueAsType.end === null
                || (typeof valueAsType.end === 'string'
                    && new Date(valueAsType.end).toString() !== 'Invalid Date'));
        var isValidStart = (value === null || value === void 0 ? void 0 : value.hasOwnProperty('start'))
            && (valueAsType.start === null
                || (typeof valueAsType.start === 'string'
                    && new Date(valueAsType.start).toString() !== 'Invalid Date'));
        if (isValidObject
            && isValidId
            && isValidInterval
            && isValidEnd
            && isValidStart) {
            var endDate = valueAsType.end === null
                ? null
                : new Date(valueAsType.end);
            var startDate = valueAsType.start === null
                ? null
                : new Date(valueAsType.start);
            var validValue = {
                id: valueAsType.id,
                interval: valueAsType.interval,
                end: endDate,
                start: startDate,
            };
            return validValue;
        }
        throw new Error('Error[getCoinHistory]: Input is not a valid object.');
    })
        .query(function (opts) { return __awaiter(void 0, void 0, void 0, function () {
        var input, id, interval, end, start, requestOptions, url, apiUrl, dataInfo, coinHistory;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    input = opts.input;
                    id = input.id, interval = input.interval, end = input.end, start = input.start;
                    requestOptions = {
                        method: "GET",
                        redirect: "follow",
                    };
                    url = (end !== null && start !== null)
                        ? API + "/assets/".concat(id, "/history?interval=").concat(interval, "&end=").concat(+end, "&start=").concat(+start)
                        : API + "/assets/".concat(id, "/history?interval=").concat(interval);
                    return [4 /*yield*/, fetch(url, requestOptions)];
                case 1:
                    apiUrl = _a.sent();
                    return [4 /*yield*/, apiUrl.json()];
                case 2:
                    dataInfo = _a.sent();
                    coinHistory = dataInfo.data.map(function (data) {
                        var newCoinHistory = {
                            priceUsd: (0, helper_1.formatPrice)(data.priceUsd),
                            time: data.time,
                            date: new Date(data.time),
                        };
                        return newCoinHistory;
                    });
                    return [2 /*return*/, coinHistory];
            }
        });
    }); })
});
exports.default = appRouter;
