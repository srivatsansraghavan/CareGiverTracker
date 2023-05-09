import { connectToMongoDBGetTable, cgtdbEnv } from "../config.js";
import moment from "moment";

export async function addToInventory(req, res, next) {
  try {
    const collection = await connectToMongoDBGetTable(
      cgtdbEnv[process.env.NODE_ENV],
      "tbl_inventory"
    );
    let addedTime = moment().format("DD/MM/YYYY HH:mm:ss");
    const inventoryTotal =
      req.body.inventoryCount * req.body.inventoryEachContains;
    const insertQuery = {
      care_giver: req.body.careGiver,
      care_taken_of_name: req.body.careTakenOf.name,
      care_taken_of_id: req.body.careTakenOf.id,
      inventory_type: req.body.inventoryType,
      inventory_brand: req.body.inventoryBrand,
      inventory_form: req.body.inventoryForm,
      added_time: addedTime,
      inventory_total: inventoryTotal,
      inventory_used: 0,
    };
    const saveInventory = await collection.insertOne(insertQuery);
    if (saveInventory.acknowledged) {
      res
        .status(200)
        .json({ message: `Inventory of ${req.body.careTakenOf.name} noted!` });
    } else {
      res
        .status(404)
        .json({ message: "Unable to add inventory. Please try later!" });
    }
  } catch (err) {
    return next(err);
  }
}

export async function getInventories(req, res, next) {
  try {
    const collection = await connectToMongoDBGetTable(
      cgtdbEnv[process.env.NODE_ENV],
      "tbl_inventory"
    );
    const getInventories = await collection
      .find({
        care_giver: req.query.careGiver,
        care_taken_of_id: req.query.careTakenId,
      })
      .sort({ _id: -1 })
      .toArray();
    if (getInventories && getInventories.length > 0) {
      res.status(200).json(getInventories);
    } else {
      res.status(404).json({ message: "No inventories found" });
    }
  } catch (err) {
    return next(err);
  }
}

export async function getAvailableInventory(req, res, next) {
  try {
    const collection = await connectToMongoDBGetTable(
      cgtdbEnv[process.env.NODE_ENV],
      "tbl_inventory"
    );
    const getAvlInventory = await collection
      .find({
        care_giver: req.query.careGiver,
        care_taken_of_id: req.query.careTakenId,
        inventory_type: req.query.inventoryType,
        $expr: { $gt: ["$inventory_total", "$inventory_used"] },
      })
      .sort({ _id: -1 })
      .toArray();
    if (getAvlInventory && getAvlInventory.length > 0) {
      res.status(200).json(getAvlInventory);
    } else {
      res.status(404).json({ message: "No inventory found" });
    }
  } catch (err) {
    return next(err);
  }
}
