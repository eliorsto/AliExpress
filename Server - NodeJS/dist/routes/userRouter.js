"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
// const bcrypt = require("bcrypt");
const auth_1 = require("../middleware/auth");
// import { userService } from "../controller/user";
exports.router = (0, express_1.Router)();
exports.router.use(auth_1.checkToken);
