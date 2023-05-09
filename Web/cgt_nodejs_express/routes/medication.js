import { Router } from "express";
const router = Router();
import {
  saveTrackedMedications,
  getMedicationDetails,
  deleteMedication,
  getMedForId,
  getMedForm,
} from "../controllers/medicationController.js";

router.post("/save-tracked-medication", saveTrackedMedications);
router.get("/get-medication-details", getMedicationDetails);
router.delete("/delete-med/:medId", deleteMedication);
router.get("/get-med-for-id/:medId", getMedForId);
router.get("/get-med-form/:medId", getMedForm);

export default router;
