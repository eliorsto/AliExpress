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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const RefreshToken_1 = require("../model/RefreshToken");
exports.refreshTokenService = {
    get: (token) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!token)
                return;
            const refreshToken = yield RefreshToken_1.RefreshToken.findOne({ token });
            if (!refreshToken)
                return;
            return refreshToken;
        }
        catch (error) {
            console.error(error.message);
            return;
        }
    }),
    create: (id, token) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!id || !token)
                return;
            yield new RefreshToken_1.RefreshToken({ userId: id, token }).save();
        }
        catch (error) {
            console.error(error.message);
            return;
        }
    }),
    delete: (token) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!token)
                return;
            yield RefreshToken_1.RefreshToken.deleteOne({ token });
        }
        catch (error) {
            console.error(error.message);
            return;
        }
    }),
    generate: (id) => {
        return jsonwebtoken_1.default.sign({ id }, (process.env.JWT_REFRESH_SECRET || "secret"), {
            expiresIn: "7d"
        });
    }
};
