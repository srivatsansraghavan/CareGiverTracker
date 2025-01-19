import { connectToMongoDB, cgtdbEnv } from "../config.js";

async function getUserSchema() {
  const userTable = await connectToMongoDB(cgtdbEnv[process.env.NODE_ENV]);

  const userSchema = await userTable.Schema({
    user_email: {
      type: String,
      required: [true, "Email id is required"],
      lowercase: true,
      unique: true,
    },
    user_fullname: { type: String, required: [true, "Full name is required"] },
    user_password: { type: String, required: [true, "Password is required"] },
    user_signup_time: { type: String },
  });

  return (
    userTable.models["tbl_users"] || userTable.model("tbl_users", userSchema)
  );
}

export const addUserModel = async function (query) {
  const userModel = await getUserSchema();
  const addedUser = await new userModel(query).save();
  return JSON.parse(JSON.stringify(addedUser));
};

export const getUserDetails = async function (emailId) {
  const userModel = await getUserSchema();
  const fetchDetails = await userModel
    .findOne({
      user_email: emailId,
    })
    .exec();
  return fetchDetails;
};
