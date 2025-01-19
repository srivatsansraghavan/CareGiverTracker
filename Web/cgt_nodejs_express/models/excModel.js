import { connectToMongoDB, cgtdbEnv } from "../config.js";

async function getExcSchema() {
  const excTable = await connectToMongoDB(cgtdbEnv[process.env.NODE_ENV]);

  const excSchema = await excTable.Schema({
    care_giver: {
      type: String,
      required: [true, "Care Giver Id is required"],
    },
    care_taken_of_name: {
      type: String,
      required: [true, "Care Taken Name is required"],
    },
    care_taken_of_id: {
      type: String,
      required: [true, "Care Taken of Id is required"],
    },
    excretion_type: {
      type: String,
      required: [true, "Excretion Type is required"],
    },
    napkin_type: {
      type: String,
      required: [true, "Napkin Type is required"],
    },
    diaper_count: {
      type: Number,
    },
    diaper_brand: {
      type: String,
    },
    excretion_time: {
      type: Date,
    },
  });

  return (
    excTable.models["tbl_excretion"] ||
    excTable.model("tbl_excretion", excSchema)
  );
}

export const saveTrackedExcModel = async function (query) {
  const excModel = await getExcSchema();
  const addedExc = await new excModel(query).save();
  return JSON.parse(JSON.stringify(addedExc));
};

export const getExcDetailsModel = async function (finder) {
  const excModel = await getExcSchema();
  const getExcDetails = await excModel
    .find(finder, null)
    .sort({ _id: -1 })
    .exec();
  return getExcDetails;
};

export const deleteExcretionModel = async function (finder) {
  const excModel = await getExcSchema();
  const deleteExc = await excModel.deleteOne(finder);
  return deleteExc;
};

export const getExcretionModel = async function (finder) {
  const excModel = await getExcSchema();
  const getExcForId = await excModel.findOne(finder, null).exec();
  return getExcForId;
};
