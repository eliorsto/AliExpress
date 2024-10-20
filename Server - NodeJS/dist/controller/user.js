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
exports.userService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../model/User");
exports.userService = {
    getUser: (filter) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!filter)
                return;
            const user = yield User_1.User.findOne(filter);
            return user;
        }
        catch (error) {
            console.error(error.message);
            return;
        }
    }),
    createUser: (fullName, email, password) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!fullName || !email || !password)
                return;
            const hashedPassword = yield bcrypt_1.default.hash(password, +(process.env.SALT_ROUNDS || 10));
            const newUser = yield new User_1.User({
                fullName,
                email,
                password: hashedPassword,
            }).save();
            return newUser;
        }
        catch (error) {
            console.error(error.message);
            return;
        }
    }),
    updateUser: (filter, update) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!filter || !update)
                return;
            yield User_1.User.updateOne(filter, update, { new: true });
        }
        catch (error) {
            console.error(error.message);
            return;
        }
    })
};
