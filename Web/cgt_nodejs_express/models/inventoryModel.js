import { connectToMongoDB, cgtdbEnv } from "../config.js";

async function getInvSchema() {
  const invTable = await connectToMongoDB(cgtdbEnv[process.env.NODE_ENV]);

  const invSchema = await invTable.Schema({
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
    },
    inventory_total: {
      type: Number,
    },
    inventory_used: {
      type: Number,
    },
    added_time: {
      type: Date,
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
  return getInvDetails.map((getInvDetail) => ({
      id: getInvDetail._id,
      careGiver: getInvDetail.care_giver,
      careTakenOfName: getInvDetail.care_taken_of_name,
      careTakenOfId: getInvDetail.care_taken_of_id,
      inventoryType: getInvDetail.inventory_type,
      inventoryBrand: getInvDetail.inventory_brand,
      inventoryForm: getInvDetail.inventory_form,
      inventoryTotal: getInvDetail.inventory_total,
      inventoryUsed: getInvDetail.inventory_used,
      addedTime: getInvDetail.added_time,
  }));
};

export const getAvailableInventoryModel = async function (finder) {
  const invModel = await getInvSchema();
  const getAvailableInventoryDetails = await invModel
    .find(finder)
    .sort({ _id: -1 })
    .exec();
  return getAvailableInventoryDetails.map((getAvailableInventoryDetail) => ({
      id: getAvailableInventoryDetail._id,
      careGiver: getAvailableInventoryDetail.care_giver,
      careTakenOfName: getAvailableInventoryDetail.care_taken_of_name,
      careTakenOfId: getAvailableInventoryDetail.care_taken_of_id,
      inventoryType: getAvailableInventoryDetail.inventory_type,
      inventoryBrand: getAvailableInventoryDetail.inventory_brand,
      inventoryForm: getAvailableInventoryDetail.inventory_form,
      inventoryTotal: getAvailableInventoryDetail.inventory_total,
      inventoryUsed: getAvailableInventoryDetail.inventory_used,
      addedTime: getAvailableInventoryDetail.added_time,
  }));
};
