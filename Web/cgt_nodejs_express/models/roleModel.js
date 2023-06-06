import { connectToMongoDB, cgtdbEnv } from "../config.js";

async function getRoleSchema() {
  const roleTable = await connectToMongoDB(cgtdbEnv[process.env.NODE_ENV]);

  const roleSchema = await roleTable.Schema({
    care_giver: {
      type: String,
      required: [true, "Care Giver Email is required"],
    },
    care_taken_of: {
      type: String,
      required: [true, "Care Taken of is required"],
    },
    care_taken_name: {
      type: String,
      required: [true, "Care Taken name is required"],
    },
    care_taken_dob: {
      type: Date,
      required: [true, "Care Taken Date of Birth is required"],
    },
    care_taken_gender: {
      type: String,
      required: [true, "Care Taken Gender is required"],
    },
    care_taken_added_time: { type: Date },
    care_last_accessed: {
      type: Boolean,
    },
  });

  return (
    roleTable.models["tbl_roles"] || roleTable.model("tbl_roles", roleSchema)
  );
}

export const firstLoginModel = async function (emailId) {
  const roleModel = await getRoleSchema();
  const firstTimeLogin = await roleModel
    .countDocuments({
      care_giver: emailId,
    })
    .exec();
  return firstTimeLogin;
};

export const addRoleModel = async function (query) {
  const roleModel = await getRoleSchema();
  const addedRole = await new roleModel(query).save();
  return JSON.parse(JSON.stringify(addedRole));
};

export const getRoleDetailsModel = async function (emailId) {
  const roleModel = await getRoleSchema();
  const getRoleDetails = await roleModel
    .findOne({
      care_giver: emailId,
      care_last_accessed: true,
    })
    .exec();
  return getRoleDetails;
};
