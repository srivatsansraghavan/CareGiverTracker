import { Router } from "express";
const router = Router();
import {
  firstLogin,
  addRole,
  getRoleDetails,
} from "../controllers/roleController.js";

router.get("/is-first-login", firstLogin);
router.post("/add-role", addRole);
router.get("/get-role-details", getRoleDetails);

export default router;
