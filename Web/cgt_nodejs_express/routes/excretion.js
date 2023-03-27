const express = require("express");
const router = express.Router();
const dbConfig = require("../config");
const moment = require("moment");
const ObjectId = require("mongodb").ObjectId;

router.post("/save-tracked-excretion", async (req, res) => {
  try {
    const collection = await dbConfig.connectToMongoDBGetTable(
      dbConfig.cgtdbEnv[process.env.NODE_ENV],
      "tbl_excretion"
    );
    let excTime = moment().format("DD/MM/YYYY HH:mm:ss");
    const insertQuery = {
      care_giver: req.body.careGiver,
      care_taken_of_name: req.body.careTakenOf.name,
      care_taken_of_id: req.body.careTakenOf.id,
      excretion_type: req.body.excretionType,
      napkin_type: req.body.napkinType,
      diaper_count: req.body.diaperCount,
      diaper_brand: req.body.diaperBrand,
      excretion_time: excTime,
    };
    const saveTrackedExc = await collection.insertOne(insertQuery);
    if (saveTrackedExc.acknowledged) {
      const invCollection = await dbConfig.connectToMongoDBGetTable(
        dbConfig.cgtdbEnv[process.env.NODE_ENV],
        "tbl_inventory"
      );
      await invCollection.updateOne(
        { _id: ObjectId(req.body.diaperBrand) },
        { $inc: { inventory_used: req.body.diaperCount } }
      );
      res
        .status(200)
        .json({ message: `Excretion of ${req.body.careTakenOf.name} noted!` });
    } else {
      res.status(404).json({
        message: "Unable to add tracked excretion. Please try later!",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/get-excretion-details", async (req, res) => {
  try {
    const collection = await dbConfig.connectToMongoDBGetTable(
      dbConfig.cgtdbEnv[process.env.NODE_ENV],
      "tbl_excretion"
    );
    const getTrackedExcretion = await collection
      .find({
        care_giver: req.query.careGiver,
        care_taken_of_id: req.query.careTakenId,
      })
      .sort({ _id: -1 })
      .toArray();
    if (getTrackedExcretion && getTrackedExcretion.length > 0) {
      res.status(200).json(getTrackedExcretion);
    } else {
      res.status(404).json({ message: "No tracked excretions found" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.delete("/delete-exc/:excId", async (req, res) => {
  try {
    const collection = await dbConfig.connectToMongoDBGetTable(
      dbConfig.cgtdbEnv[process.env.NODE_ENV],
      "tbl_excretion"
    );
    const getDiaperDetails = await db
      .collection("tbl_excretion")
      .find({ _id: ObjectId(req.params.excId) })
      .toArray();
    if (getDiaperDetails[0].napkin_type === "Diaper") {
      const diaperCount = getDiaperDetails[0].diaper_count;
      const diaperBrand = getDiaperDetails[0].diaper_brand;
      const invCollection = await dbConfig.connectToMongoDBGetTable(
        client,
        dbConfig.cgtdbEnv[process.env.NODE_ENV],
        "tbl_inventory"
      );
      await invCollection.updateOne(
        { _id: ObjectId(diaperBrand) },
        { $inc: { inventory_used: -diaperCount } }
      );
    }
    const deleteExc = await collection.deleteOne({
      _id: ObjectId(req.params.excId),
    });
    if (deleteExc.acknowledged && deleteExc.deletedCount === 1) {
      res
        .status(200)
        .json({ message: "Tracked excretion deleted successfully" });
    } else {
      res.status(404).json({
        message: "Unable to delete tracked excretion. Please try again later!",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/get-exc-for-id/:excId", async (req, res) => {
  try {
    const collection = await dbConfig.connectToMongoDBGetTable(
      dbConfig.cgtdbEnv[process.env.NODE_ENV],
      "tbl_excretion"
    );
    const getExcForId = await collection.findOne({
      _id: ObjectId(req.params.excId),
    });
    if (getExcForId && Object.keys(getExcForId).length > 0) {
      res.status(200).json(getExcForId);
    } else {
      res.status(404).json({
        message: "Unable to get tracked excretion. Please try again later!",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
