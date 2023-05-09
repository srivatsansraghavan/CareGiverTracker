import { Router } from "express";
const router = Router();
import {
  saveTrackingFeed,
  savePumpingFeed,
  getFeedDetails,
  getPumpedFeed,
  deleteTrackedFeed,
  getFeedForId,
  saveEditedFeed,
} from "../controllers/feedController.js";

router.post("/save-tracking-feed", saveTrackingFeed);
router.post("/save-pumping-feed", savePumpingFeed);
router.get("/get-feed-details", getFeedDetails);
router.get("/get-pumped-feeds", getPumpedFeed);
router.delete("/delete-feed/:feedId", deleteTrackedFeed);
router.get("/get-feed-for-id/:feedId", getFeedForId);
router.post("/save-edited-feed", saveEditedFeed);

export default router;
