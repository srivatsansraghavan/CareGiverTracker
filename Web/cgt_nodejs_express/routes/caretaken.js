import { Router } from "express";
const router = Router();
import {
  firstLogin,
  addCareTaken,
  getCareTakenDetails,
  getSelectedCareTakenDetail,
  changeCareTaken,
} from "../controllers/caretakenController.js";
import { isAuthenticated } from "../utils.js";

router.get("/is-first-login", isAuthenticated, firstLogin);
router.post("/add-care-taken", isAuthenticated, addCareTaken);
router.get("/get-care-taken-details", isAuthenticated, getCareTakenDetails);
router.get("/get-selected-care-taken-detail", isAuthenticated, getSelectedCareTakenDetail);
router.post("/change-care-taken", changeCareTaken);

export default router;
