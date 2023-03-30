const express = require("express");
const router = express.Router();
const dbConfig = require("../config");

router.get("/", (req, res) => {
  res.send("Caregiver Tracker Express server running!");
});

router.get("/clean-env-db/:env", async (req, res) => {
  try {
    if (req.params.env === "dev") {
      res.send("Not allowed to perform clean");
    } else {
      const db = await dbConfig.connectToMongoDB(
        dbConfig.cgtdbEnv[req.params.env]
      );
      await db.collection("tbl_users").deleteMany();
      await db.collection("tbl_roles").deleteMany();
      await db.collection("tbl_feeding").deleteMany();
      await db.collection("tbl_excretion").deleteMany();
      await db.collection("tbl_inventory").deleteMany();
      res.sendStatus(200);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
