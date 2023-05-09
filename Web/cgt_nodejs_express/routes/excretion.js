import { Router } from "express";
const router = Router();
import {
  saveTrackedExcretion,
  getExcretionDetails,
  deleteExcretion,
  getExcretionForId,
} from "../controllers/excretionController.js";

router.post("/save-tracked-excretion", saveTrackedExcretion);
router.get("/get-excretion-details", getExcretionDetails);
router.delete("/delete-exc/:excId", deleteExcretion);
router.get("/get-exc-for-id/:excId", getExcretionForId);

export default router;
