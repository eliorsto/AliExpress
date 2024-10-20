import { Router } from "express";
// const bcrypt = require("bcrypt");
import { checkToken } from "../middleware/auth";
// import { userService } from "../controller/user";

export const router = Router();

router.use(checkToken);
