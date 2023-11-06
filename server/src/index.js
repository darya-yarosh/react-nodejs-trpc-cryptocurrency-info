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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var trpcExpress = __importStar(require("@trpc/server/adapters/express"));
var appRouter_1 = __importDefault(require("./appRouter"));
/**
 * @param optionsSuccessStatus Provides a status code for successfully resolving OPTIONS requests (for legacy browser support).
 * @param credential Permission to provide a response to external JavaScript code by browsers.
 * @param origin A list of sources for which CORS is enabled.
 */
var corsOptions = {
    optionsSuccessStatus: 200,
    credentials: true,
    origin: "*",
};
var cors = require("cors");
var app = (0, express_1.default)();
app.use(cors(corsOptions));
app.use(function (request, response, next) {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});
var createContext = function (_a) {
    var request = _a.req, response = _a.res;
    return ({});
};
app.use('/trpc', trpcExpress.createExpressMiddleware({
    router: appRouter_1.default,
    createContext: createContext,
}));
var PORT = 4000;
app.listen(PORT, function () {
    console.log("Running on PORT ".concat(PORT));
});
