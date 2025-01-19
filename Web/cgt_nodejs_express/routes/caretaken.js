import { Router } from "express";
const router = Router();
import {
  firstLogin,
  addCareTaken,
  getCareTakenDetails,
  getSelectedCareTakenDetail,
  changeCareTaken,
} from "../controllers/caretakenController.js";

router.get("/is-first-login", firstLogin);
router.post("/add-care-taken", addCareTaken);
router.get("/get-care-taken-details", getCareTakenDetails);
router.get("/get-selected-care-taken-detail", getSelectedCareTakenDetail);
router.post("/change-care-taken", changeCareTaken);

export default router;
