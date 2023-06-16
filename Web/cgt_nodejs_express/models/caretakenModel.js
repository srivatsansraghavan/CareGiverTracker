import { connectToMongoDB, cgtdbEnv } from "../config.js";

async function getCareTakenSchema() {
  const caretakenTable = await connectToMongoDB(cgtdbEnv[process.env.NODE_ENV]);

  const caretakenSchema = await caretakenTable.Schema({
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
    caretakenTable.models["tbl_caretaken"] ||
    caretakenTable.model("tbl_caretaken", caretakenSchema)
  );
}

export const firstLoginModel = async function (userId) {
  const caretakenModel = await getCareTakenSchema();
  const firstTimeLogin = await caretakenModel
    .countDocuments({
      care_giver: userId,
    })
    .exec();
  console.log(firstTimeLogin);
  return firstTimeLogin;
};

export const addCareTakenModel = async function (query) {
  const caretakenModel = await getCareTakenSchema();
  await caretakenModel.updateMany(
    { care_giver: query.care_giver },
    { $set: { care_last_accessed: false } }
  );
  const addedCareTaken = await new caretakenModel(query).save();
  return JSON.parse(JSON.stringify(addedCareTaken));
};

export const getCareTakenDetailsModel = async function (emailId) {
  const caretakenModel = await getCareTakenSchema();
  const getCareTakenDetails = await caretakenModel
    .find({
      care_giver: emailId,
    })
    .exec();
  return getCareTakenDetails;
};

export const getSelectedCareTakenDetailModel = async function (userId) {
  const caretakenModel = await getCareTakenSchema();
  const getSelectedCareTakenDetail = await caretakenModel
    .findOne({
      care_giver: userId,
      care_last_accessed: true,
    })
    .exec();
  return getSelectedCareTakenDetail;
};

export const changeCareTakenModel = async function (careTakenId, emailId) {
  const caretakenModel = await getCareTakenSchema();
  await caretakenModel.updateMany(
    { care_giver: emailId },
    { $set: { care_last_accessed: false } }
  );
  await caretakenModel.updateOne(
    { _id: careTakenId },
    { $set: { care_last_accessed: true } }
  );
  const changedCareTakenDetail = await caretakenModel
    .findOne({
      _id: careTakenId,
    })
    .exec();
  return changedCareTakenDetail;
};
