import jwt from "jsonwebtoken";
import { Token } from "../model/Token";
import { ObjectId } from "mongoose";

export const tokenService = {
	get: async (token: string) => {
		if (!token) return;

		try {
			const accessToken = await Token.findOne({ token });
			return accessToken;
		} catch (error: any) {
			console.error(error.message);
			return;
		}
	},
	create: async (id: ObjectId, token: string) => {
		try {
			if (!id || !token) return;

			await new Token({ userId: id, token }).save();
		} catch (error: any) {
			console.error(error.message);
			return;
		}
	},
	delete: async (token: string) => {
		try {
			if (!token) return;

			await Token.deleteMany({ token });
		} catch (error: any) {
			console.error(error.message);
			return;
		}
	},
	generate: (id: ObjectId) => {
		return jwt.sign({ id }, (process.env.JWT_SECRET || "secret2"), {
			expiresIn: "1h"
		});
	}
}