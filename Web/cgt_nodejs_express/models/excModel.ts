import { model, type PassportLocalDocument, type PassportLocalModel, type PassportLocalSchema, type RootFilterQuery } from "mongoose";
import { connectToMongoDB, cgtdbEnv } from "../config.js";

export interface IExc extends PassportLocalDocument {
  care_giver: string;
  care_taken_of_name: string;
  care_taken_of_id: string;
  excretion_type: string;
  napkin_type: string;
  diaper_count: number;
  diaper_brand: string;
  excretion_time: Date;
}
type ExcModel = PassportLocalModel<IExc>;
async function getExcSchema() {
  const nodeEnv = process.env.NODE_ENV as keyof typeof cgtdbEnv;
  if (!nodeEnv) {
    throw new Error('No Node Env');
  }
  const mongoDB = await connectToMongoDB(cgtdbEnv[nodeEnv]);
  if (!mongoDB) {
    throw new Error('No Care taken table');
  }
  const excSchema: PassportLocalSchema<IExc, ExcModel> = new mongoDB.Schema({
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

  return excSchema;
}

export const excModel = model<IExc, ExcModel>('tbl_excretion', await getExcSchema());

export const saveTrackedExcModel = async function (query: any) {
  const addedExc = await new excModel(query).save();
  return JSON.parse(JSON.stringify(addedExc));
};

export const getExcDetailsModel = async function (finder: RootFilterQuery<IExc>) {
  const getExcDetails = await excModel
    .find(finder, null)
    .sort({ _id: -1 })
    .exec();
  return getExcDetails.map((exc) => ({
    id: exc._id,
    excretionType: exc.excretion_type,
    napkinType: exc.napkin_type,
    diaperCount: exc.diaper_count,
    diaperBrand: exc.diaper_brand,
    excretionTime: exc.excretion_time,
  }));
};

export const deleteExcretionModel = async function (finder: RootFilterQuery<IExc>) {
  const deleteExc = await excModel.deleteOne(finder);
  return deleteExc;
};

export const getExcretionModel = async function (finder: RootFilterQuery<IExc>): Promise<string> {
  const getExcForId = await excModel.findOne(finder, null).exec();
  return getExcForId;
};
