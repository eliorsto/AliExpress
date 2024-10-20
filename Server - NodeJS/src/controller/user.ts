import bcrypt from "bcrypt";
import { User } from "../model/User";

export const userService = {
	getUser: async (filter: any) => {
		try {
			if (!filter) return;
			const user = await User.findOne(filter);

			return user;
		} catch (error: any) {
			console.error(error.message);
			return;
		}
	},
	createUser: async (fullName: string, email: string, password: string) => {
		try {
			if (!fullName || !email || !password) return;

			const hashedPassword = await bcrypt.hash(password, +(process.env.SALT_ROUNDS || 10));

			const newUser = await new User({
				fullName,
				email,
				password: hashedPassword,
			}).save();

			return newUser;
		} catch (error: any) {
			console.error(error.message);
			return;
		}
	},
	updateUser: async (filter: any, update: any) => {
		try {
			if (!filter || !update) return;

			await User.updateOne(filter, update, { new: true });
		} catch (error: any) {
			console.error(error.message);
			return;
		}
	}
}