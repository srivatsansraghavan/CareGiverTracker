import { connectToMongoDB, cgtdbEnv } from "../config.js";

async function getInvSchema() {
  const invTable = await connectToMongoDB(cgtdbEnv[process.env.NODE_ENV]);

  const invSchema = await invTable.Schema({
    care_giver: {
      type: String,
      required: [true, "Care Giver Email is required"],
    },
    care_taken_of_name: {
      type: String,
      required: [true, "Care Taken Name is required"],
    },
    care_taken_of_id: {
      type: String,
      required: [true, "Care Taken of Id is required"],
    },
    inventory_type: {
      type: String,
      required: [true, "Inventory Type is required"],
    },
    inventory_brand: {
      type: String,
      required: [true, "Inventory Brand is required"],
    },
    inventory_form: {
      type: String,
      required: [true, "Inventory Form is required"],
    },
    inventory_total: {
      type: Number,
    },
    inventory_used: {
      type: Number,
    },
    added_time: {
      type: String,
    },
  });

  return (
    invTable.models["tbl_inventory"] ||
    invTable.model("tbl_inventory", invSchema)
  );
}

export const saveTrackedInvModel = async function (query) {
  const invModel = await getInvSchema();
  const addedInv = await new invModel(query).save();
  return JSON.parse(JSON.stringify(addedInv));
};

export const updateInventoryModel = async function (finder, updated) {
  const invModel = await getInvSchema();
  const updatedInv = await invModel.findOneAndUpdate(
    finder,
    { $inc: updated },
    {
      new: true,
    }
  );
  return JSON.parse(JSON.stringify(updatedInv));
};

export const getInventoriesModel = async function (finder) {
  const invModel = await getInvSchema();
  const getInvDetails = await invModel
    .find(finder, null)
    .sort({ _id: -1 })
    .exec();
  return getInvDetails;
};

export const getAvailableInventoryModel = async function (finder) {
  const invModel = await getInvSchema();
  const getAvailableInventoryDetails = await invModel
    .find(finder)
    .sort({ _id: -1 })
    .exec();
  return getAvailableInventoryDetails;
};
