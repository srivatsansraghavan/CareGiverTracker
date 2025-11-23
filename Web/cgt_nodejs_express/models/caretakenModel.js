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
      type: String,
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

  caretakenSchema.index({ care_giver: 1, care_taken_of: 1 }, { unique: true })

  return (
    caretakenTable.models["tbl_caretaken"] ||
    caretakenTable.model("tbl_caretaken", caretakenSchema)
  );
}

export const firstLoginModel = async function (userEmail) {
  const caretakenModel = await getCareTakenSchema();
  const firstTimeLogin = await caretakenModel
    .countDocuments({
      care_giver: userEmail,
    })
    .exec();
  return firstTimeLogin;
};

export const addCareTakenModel = async function (careTaken) {
  try {
    const caretakenModel = await getCareTakenSchema();
    // await caretakenModel.updateMany(
    //   { care_giver: careTaken.care_giver },
    //   { $set: { care_last_accessed: false } }
    // );
    const addedCareTaken = await new caretakenModel(careTaken).save();
    return JSON.parse(JSON.stringify(addedCareTaken));
  } catch (err) {
    throw err;
  }
};

export const getCareTakenDetailsModel = async function (userId) {
  const caretakenModel = await getCareTakenSchema();
  const getCareTakenDetails = await caretakenModel
    .find({
      care_giver: userId,
    })
    .exec();
  return getCareTakenDetails;
};

export const changeCareTakenModel = async function (careTakenId, userId) {
  const caretakenModel = await getCareTakenSchema();
  await caretakenModel.updateMany(
    { care_giver: userId },
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
