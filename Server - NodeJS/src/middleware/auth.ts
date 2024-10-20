import { Request, Response, NextFunction } from 'express';
import { tokenService } from "../controller/token";
import { userService } from "../controller/user";

interface AuthenticatedRequest extends Request {
	user?: any;
}

export const checkToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
	const { token } = req.headers;

	if (!token) {
		return res.status(401).json({ message: 'No token provided' });
	}

	try {
		const accessToken = await tokenService.get(token as string);
		if (!accessToken) {
			return res.status(401).json({ message: 'Invalid token' });
		}

		const user = await userService.getUser({ _id: accessToken.userId });
		if (!user) {
			return res.status(401).json({ message: 'Invalid token' });
		}
		req.user = user;
		next();
	} catch (error) {
		console.error('Error verifying token:', error);
		res.status(500).json({ message: 'Server error' });
	}
};