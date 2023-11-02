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
        if (typeof value === 'object'
            && value !== null
            && value.hasOwnProperty('search')
            && value.hasOwnProperty('ids')
            && value.hasOwnProperty('offset')
            && value.hasOwnProperty('limit')) {
            return value;
        }
        throw new Error('Input is not a valid object.');
    })
        .query(function (opts) { return __awaiter(void 0, void 0, void 0, function () {
        var input, requestOptions, url, apiUrl, dataInfo, coinList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    input = opts.input;
                    requestOptions = {
                        mode: 'no-cors',
                        method: "GET",
                        redirect: "follow",
                    };
                    url = API + "/assets?";
                    if (input.search !== undefined) {
                        url += "search=".concat(input.search, "&");
                    }
                    if (input.ids !== undefined) {
                        url += "ids=".concat(input.ids.join(), "&");
                    }
                    if (input.offset !== undefined && input.limit !== undefined) {
                        url += "offset=".concat(input.offset, "&limit=").concat(input.limit, "&");
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
    }); })
});
exports.default = appRouter;
