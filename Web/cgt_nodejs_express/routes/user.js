import { Router } from "express";
const router = Router();
import passport from "passport";
import { loginUser, addUser } from "../controllers/userController.js";

router.post("/add-user", addUser);
router.post("/login-user", passport.authenticate('local'), loginUser);

export default router;
