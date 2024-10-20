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
exports.router = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_1 = require("express");
const user_1 = require("../controller/user");
const refreshToken_1 = require("../controller/refreshToken");
const token_1 = require("../controller/token");
const auth_1 = require("../utils/auth");
exports.router = (0, express_1.Router)();
exports.router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_1.userService.getUser({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const isValidPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const tokens = yield (0, auth_1.createTokens)(user._id);
        if (tokens) {
            const { token, refreshToken } = tokens;
            res.status(200).json({ id: user._id, fullName: user.fullName, token, refreshToken });
        }
        else {
            res.status(500).json({ message: "Failed to create tokens" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
exports.router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }
        const user = yield user_1.userService.getUser({ email });
        if (user) {
            return res.status(409).json({ message: "User already exists" });
        }
        const newUser = yield user_1.userService.createUser(fullName, email, password);
        if (!newUser) {
            return res.status(500).json({ message: "Failed to create user" });
        }
        const tokens = yield (0, auth_1.createTokens)(newUser._id);
        if (tokens) {
            const { token, refreshToken } = tokens;
            res.status(201).json({ token, refreshToken });
        }
        else {
            res.status(500).json({ message: "Failed to create tokens" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
exports.router.post("/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, refreshtoken } = req.headers;
        yield token_1.tokenService.delete(token);
        yield refreshToken_1.refreshTokenService.delete(refreshtoken);
        res.status(200).end();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
exports.router.post("/replace", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { refreshtoken } = req.headers;
        if (!refreshtoken) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const userToken = yield refreshToken_1.refreshTokenService.get(refreshtoken);
        if (!userToken) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }
        const user = yield user_1.userService.getUser({ _id: userToken.userId });
        if (!user) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }
        const token = yield (0, auth_1.replaceAccessToken)(userToken.token);
        res.status(200).json({ token, fullName: user.fullName });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
exports.router.post("/valid-email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const user = yield user_1.userService.getUser({ email });
        res.status(200).json({ exist: user ? true : false });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
