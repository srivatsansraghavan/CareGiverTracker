import { Router } from "express";
const router = Router();
import { addUser, loginUser } from "../controllers/userController.js";

router.post("/add-user", addUser);
router.post("/login-user", loginUser);

export default router;
