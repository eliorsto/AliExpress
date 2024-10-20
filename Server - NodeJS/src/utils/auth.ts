import { ObjectId } from "mongoose";
import { refreshTokenService } from "../controller/refreshToken";
import { tokenService } from "../controller/token";

export const createTokens = async (id: ObjectId) => {
	const token = tokenService.generate(id);
	const refreshToken = refreshTokenService.generate(id);

	try {
		await tokenService.create(id, token);
		await refreshTokenService.create(id, refreshToken);

		return { token, refreshToken };
	} catch (error: any) {
		console.error(error.message);
		return;
	}
}

export const replaceAccessToken = async (refreshToken: string) => {
	try {
		const token = await refreshTokenService.get(refreshToken);
		if (!token) return;

		const newToken = tokenService.generate(token.userId as unknown as ObjectId);
		await tokenService.create(token.userId as unknown as ObjectId, newToken);

		return newToken;
	} catch (error: any) {
		console.error(error.message);
		return;
	}
}