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
exports.checkToken = void 0;
const token_1 = require("../controller/token");
const user_1 = require("../controller/user");
const checkToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.headers;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const accessToken = yield token_1.tokenService.get(token);
        if (!accessToken) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        const user = yield user_1.userService.getUser({ _id: accessToken.userId });
        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.error('Error verifying token:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.checkToken = checkToken;
