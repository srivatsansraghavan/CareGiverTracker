import { Router } from "express";
const router = Router();
import { connectToMongoDB, cgtdbEnv } from "../config.js";

router.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Caregiver Tracker Express server running!" });
});

router.get("/clean-env-db/:env", async (req, res, next) => {
  try {
    if (req.params.env === "dev") {
      res.status(401).json({ message: "Not allowed to perform DB clean" });
    } else {
      const db = await connectToMongoDB(cgtdbEnv[req.params.env]);
      db.collection("tbl_users").deleteMany();
      db.collection("tbl_roles").deleteMany();
      db.collection("tbl_feeding").deleteMany();
      db.collection("tbl_excretion").deleteMany();
      db.collection("tbl_inventory").deleteMany();
      db.collection("tbl_medication").deleteMany();
      res.sendStatus(200);
    }
  } catch (err) {
    return next(err);
  }
});

export default router;
