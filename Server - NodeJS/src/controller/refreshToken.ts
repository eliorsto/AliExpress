import jwt from "jsonwebtoken";
import { RefreshToken } from "../model/RefreshToken";
import { ObjectId } from "mongoose";

export const refreshTokenService = {
	get: async (token: string) => {
		try {
			if (!token) return;
			const refreshToken = await RefreshToken.findOne({ token });

			if (!refreshToken) return;

			return refreshToken;
		} catch (error: any) {
			console.error(error.message);
			return;
		}
	},
	create: async (id: ObjectId, token: string) => {
		try {
			if (!id || !token) return;

			await new RefreshToken({ userId: id, token }).save();
		} catch (error: any) {
			console.error(error.message);
			return;
		}
	},
	delete: async (token: string) => {
		try {
			if (!token) return;

			await RefreshToken.deleteOne({ token });
		} catch (error: any) {
			console.error(error.message);
			return;
		}
	},
	generate: (id: ObjectId) => {
		return jwt.sign({ id }, (process.env.JWT_REFRESH_SECRET || "secret"), {
			expiresIn: "7d"
		});
	}
}