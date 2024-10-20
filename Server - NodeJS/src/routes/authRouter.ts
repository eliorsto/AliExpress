import bcrypt from "bcrypt";
import { Router } from "express";
import { userService } from "../controller/user";
import { refreshTokenService } from "../controller/refreshToken";
import { tokenService } from "../controller/token";
import { createTokens, replaceAccessToken } from "../utils/auth";
import { ObjectId } from "mongoose";

export const router = Router();

router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await userService.getUser({ email });
		if (!user) {
			return res.status(401).json({ message: "Invalid email or password" });
		}

		const isValidPassword = await bcrypt.compare(password, user.password);
		if (!isValidPassword) {
			return res.status(401).json({ message: "Invalid email or password" });
		}

		const tokens = await createTokens(user._id as unknown as ObjectId);

		if (tokens) {
			const { token, refreshToken } = tokens;
			res.status(200).json({ id: user._id, fullName: user.fullName, token, refreshToken });
		} else {
			res.status(500).json({ message: "Failed to create tokens" });
		}
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
});

router.post("/register", async (req, res) => {
	try {
		const { fullName, email, password } = req.body;

		if (!fullName || !email || !password) {
			return res.status(400).json({ message: "Please fill in all fields" });
		}

		const user = await userService.getUser({ email });
		if (user) {
			return res.status(409).json({ message: "User already exists" });
		}

		const newUser = await userService.createUser(
			fullName,
			email,
			password
		);

		if (!newUser) {
			return res.status(500).json({ message: "Failed to create user" });
		}

		const tokens = await createTokens(newUser._id as unknown as ObjectId);

		if (tokens) {
			const { token, refreshToken } = tokens;
			res.status(201).json({ token, refreshToken });
		} else {
			res.status(500).json({ message: "Failed to create tokens" });
		}
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
});

router.post("/logout", async (req, res) => {
	try {
		const { token, refreshtoken } = req.headers;

		await tokenService.delete(token as string);
		await refreshTokenService.delete(refreshtoken as string);
		res.status(200).end();
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
});

router.post("/replace", async (req, res) => {
	try {
		const { refreshtoken } = req.headers;

		if (!refreshtoken) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		const userToken = await refreshTokenService.get(refreshtoken as string);
		if (!userToken) {
			return res.status(401).json({ message: "Invalid refresh token" });
		}

		const user = await userService.getUser({ _id: userToken.userId });
		if (!user) {
			return res.status(401).json({ message: "Invalid refresh token" });
		}

		const token = await replaceAccessToken(userToken.token);
		res.status(200).json({ token, fullName: user.fullName });
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
});

router.post("/valid-email", async (req, res) => {
	const { email } = req.body;

	try {
		const user = await userService.getUser({ email });

		res.status(200).json({ exist: user ? true : false });
	} catch (err: any) {
		res.status(500).json({ message: err.message });
	}
});