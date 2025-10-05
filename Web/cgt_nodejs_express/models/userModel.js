import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose"
import { cgtdbEnv } from "../config.js";
const uri = `mongodb://${process.env.MONGO_DB_URI}:27017`

export function getUserSchema() {
  mongoose.connect(`${uri}/${cgtdbEnv[process.env.NODE_ENV]}`)
  if(mongoose.models["tbl_users"]){
    return mongoose.models["tbl_users"];
  }
  const userSchema = new mongoose.Schema({
    user_email: {
      type: String,
      required: [true, "Email id is required"],
      lowercase: true,
      unique: true,
    },
    user_fullname: { type: String, required: [true, "Full name is required"] },
    user_signup_time: { type: String },
  });
  userSchema.plugin(passportLocalMongoose);
  return userSchema;
}

  export const userModel = mongoose.model('tbl_users', getUserSchema());

export const addUserModel = async function (query) {
  const addedUser = await new userModel(query).save();
  return JSON.parse(JSON.stringify( addedUser));
};

export const getUserDetails = async function (emailId) {
  const fetchDetails = await userModel
    .findOne({
      user_email: emailId,
    })
    .exec();
  return fetchDetails;
};
