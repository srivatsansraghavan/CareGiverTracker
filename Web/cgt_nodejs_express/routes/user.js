import { Router } from "express";
const router = Router();
import passport from "passport";
import { loginUser, addUser, logoutUser } from "../controllers/userController.js";

router.post("/add-user", addUser);
router.post("/login-user", passport.authenticate('local'), loginUser)
router.delete("/logout-user", logoutUser)

export default router;
