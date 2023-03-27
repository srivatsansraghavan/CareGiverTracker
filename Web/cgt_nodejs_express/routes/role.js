const express = require("express");
const router = express.Router();
const dbConfig = require("../config");
const moment = require("moment");

router.get("/is-first-login", async (req, res) => {
  try {
    const collection = await dbConfig.connectToMongoDBGetTable(
      dbConfig.cgtdbEnv[process.env.NODE_ENV],
      "tbl_roles"
    );
    const firstLogin = await collection.findOne({
      care_giver: req.query.email,
    });
    if (firstLogin && Object.keys(firstLogin).length > 0) {
      res.send(false);
    } else {
      res.send(true);
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/add-role", async (req, res) => {
  try {
    const collection = await dbConfig.connectToMongoDBGetTable(
      dbConfig.cgtdbEnv[process.env.NODE_ENV],
      "tbl_roles"
    );
    const addRole = await collection.insertOne({
      care_giver: req.body.care_giver,
      care_taken_of: req.body.care_taken_of,
      care_taken_name: req.body.care_taken_name,
      care_taken_dob: req.body.care_taken_dob,
      care_taken_gender: req.body.care_taken_gender,
      care_taken_added_time: moment().format("DD/MM/YYYY HH:mm:ss"),
      care_last_accessed: true,
    });
    if (addRole.acknowledged) {
      res.status(200).json({
        message: `Care can now be provided to ${req.body.care_taken_name}`,
      });
    } else {
      res
        .status(404)
        .json({ message: "Unable to add details. Please try later!" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/get-role-details", async (req, res) => {
  try {
    const collection = await dbConfig.connectToMongoDBGetTable(
      dbConfig.cgtdbEnv[process.env.NODE_ENV],
      "tbl_roles"
    );
    const getRoleDetails = await collection.findOne({
      care_giver: req.query.giver_email,
      care_last_accessed: true,
    });
    if (getRoleDetails && Object.keys(getRoleDetails).length > 0) {
      res.status(200).json(getRoleDetails);
    } else {
      res.status(404).json({ message: "No matching records found" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
