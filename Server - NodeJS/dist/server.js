"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
const authRouter_1 = require("./routes/authRouter");
const userRouter_1 = require("./routes/userRouter");
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
const nodeEnv = process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : 'development';
const hostingDir = nodeEnv === 'development' ? '' : '/or/projects/CloneApp/server';
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use(`${hostingDir}/auth`, authRouter_1.router);
app.use(`${hostingDir}/user`, userRouter_1.router);
app.get("/", (req, res) => {
    res.send("<h1>NodeJS Server is working</h1>");
});
(0, db_1.connectDB)().then(() => app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}));
