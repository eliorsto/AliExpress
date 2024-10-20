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
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceAccessToken = exports.createTokens = void 0;
const refreshToken_1 = require("../controller/refreshToken");
const token_1 = require("../controller/token");
const createTokens = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const token = token_1.tokenService.generate(id);
    const refreshToken = refreshToken_1.refreshTokenService.generate(id);
    try {
        yield token_1.tokenService.create(id, token);
        yield refreshToken_1.refreshTokenService.create(id, refreshToken);
        return { token, refreshToken };
    }
    catch (error) {
        console.error(error.message);
        return;
    }
});
exports.createTokens = createTokens;
const replaceAccessToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = yield refreshToken_1.refreshTokenService.get(refreshToken);
        if (!token)
            return;
        const newToken = token_1.tokenService.generate(token.userId);
        yield token_1.tokenService.create(token.userId, newToken);
        return newToken;
    }
    catch (error) {
        console.error(error.message);
        return;
    }
});
exports.replaceAccessToken = replaceAccessToken;
