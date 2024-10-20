import mongoose, { InferSchemaType } from "mongoose";

export type User = InferSchemaType<typeof UserSchema>;

const UserSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		}
	},
	{ versionKey: false }
);

export const User = mongoose.model("User", UserSchema);