const express = require("express");
const router = express.Router();
const dbConfig = require("../config");

router.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Caregiver Tracker Express server running!" });
});

router.get("/clean-env-db/:env", async (req, res) => {
  try {
    if (req.params.env === "dev") {
      res.status(401).json({ message: "Not allowed to perform DB clean" });
    } else {
      const db = await dbConfig.connectToMongoDB(
        dbConfig.cgtdbEnv[req.params.env]
      );
      await db.collection("tbl_users").deleteMany();
      await db.collection("tbl_roles").deleteMany();
      await db.collection("tbl_feeding").deleteMany();
      await db.collection("tbl_excretion").deleteMany();
      await db.collection("tbl_inventory").deleteMany();
      await db.collection("tbl_medication").deleteMany();
      res.sendStatus(200);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
