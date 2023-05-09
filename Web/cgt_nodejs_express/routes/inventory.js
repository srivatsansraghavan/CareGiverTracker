import { Router } from "express";
const router = Router();
import {
  addToInventory,
  getInventories,
  getAvailableInventory,
} from "../controllers/inventoryController.js";

router.post("/add-to-inventory", addToInventory);
router.get("/get-inventories", getInventories);
router.get("/get-available-inventory", getAvailableInventory);

export default router;
