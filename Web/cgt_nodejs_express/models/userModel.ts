import mongoose, { model, Mongoose, Schema, type PassportLocalDocument, type PassportLocalModel, type PassportLocalSchema } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose"
import { cgtdbEnv, connectToMongoDB } from "../config.js";
import "dotenv/config";
export interface IUser extends PassportLocalDocument {
  user_email: string;
  user_fullname: string;
  user_signup_time: string;
  username: string;
}
type UserModel = PassportLocalModel<IUser>;
export async function getUserSchema(): Promise<PassportLocalSchema<IUser, UserModel>> {
  const nodeEnv = process.env.NODE_ENV as keyof typeof cgtdbEnv;
  if (!nodeEnv) {
    throw new Error('NODE_ENV not available.')
  }
  const userTable: Mongoose | undefined = await connectToMongoDB(cgtdbEnv[nodeEnv]);

  if (!userTable) {
    throw new Error('User table not returned');
  }
  const userSchema: PassportLocalSchema<IUser, UserModel> = new userTable.Schema({
    user_email: {
      type: String,
      required: [true, "Email id is required"],
      lowercase: true,
      unique: true,
    },
    user_fullname: { type: String, required: [true, "Full name is required"] },
    user_signup_time: { type: String },
    username: { type: String },
  });
  userSchema.plugin(passportLocalMongoose);
  return userSchema;
}

export const userModel = model<IUser, UserModel>('tbl_users', await getUserSchema());