import moment from "moment";
import {
  saveTrackedFeedModel,
  saveFeedForPumpedModel,
  savePumpedModel,
  getFeedDetailsModel,
  getPumpedDetailsModel,
  deleteTrackedFeedModel,
  getFeedByIdModel,
  saveEditedFeedModel,
} from "../models/feedModel.js";

export async function saveTrackingFeed(req, res, next) {
  try {
    let addTrackedFeed;
    let feedEndTime = moment().format("MM/DD/YYYY HH:mm:ss");
    let feedStartTime = moment(feedEndTime, "MM/DD/YYYY HH:mm:ss")
      .subtract(req.body.feedTime, "seconds")
      .format("MM/DD/YYYY HH:mm:ss");
    let insertQuery = {
      feed_giver: req.body.feedGiver,
      feed_taker_name: req.body.feedTaker.name,
      feed_taker_id: req.body.feedTaker.id,
      feed_taken_type: req.body.feedType,
      feed_taken_mode: req.body.feedMode,
      feed_taken_side: req.body.feedSide,
      feed_taken_time: req.body.feedTime,
      feed_quantity: req.body.feedQuantity,
      feed_start_time: feedStartTime,
      feed_end_time: feedEndTime,
      is_pumped_feed: false,
      is_feed_given: true,
    };
    if (
      req.body.feedType === "Breast Milk" &&
      req.body.feedMode === "Pumped Milk"
    ) {
      insertQuery.is_pumped_feed = true;
      addTrackedFeed = await saveFeedForPumpedModel(
        { _id: req.body.pumpedFeedId },
        insertQuery
      );
    } else {
      addTrackedFeed = await saveTrackedFeedModel(insertQuery);
    }
    if (addTrackedFeed.hasOwnProperty("_id")) {
      res.status(200).json({
        message: `Feed of type ${req.body.feedType} given to ${req.body.feedTaker.name} added!`,
      });
    } else {
      res
        .status(404)
        .json({ message: "Unable to add tracked feed. Please try later!" });
    }
  } catch (err) {
    return next(err);
  }
}

export async function savePumpingFeed(req, res, next) {
  try {
    let feedEndTime = moment().format("MM/DD/YYYY HH:mm:ss");
    let feedStartTime = moment(feedEndTime, "MM/DD/YYYY HH:mm:ss")
      .subtract(req.body.feedTime, "seconds")
      .format("MM/DD/YYYY HH:mm:ss");
    let insertQuery = {
      pumped_by: req.body.feedGiver,
      pumped_for_name: req.body.feedTaker.name,
      pumped_for_id: req.body.feedTaker.id,
      pumped_mode: req.body.feedMode,
      pumped_side: req.body.feedSide,
      pumped_time: req.body.feedTime,
      pumped_quantity: req.body.feedQuantity,
      pump_start_time: feedStartTime,
      pump_end_time: feedEndTime,
      is_pumped_feed: true,
      is_feed_given: false,
    };
    const addPumpedFeed = await savePumpedModel(insertQuery);
    if (addPumpedFeed.hasOwnProperty("_id")) {
      res
        .status(200)
        .json({ message: `Pumping for ${req.body.feedTaker.name} completed!` });
    } else {
      res
        .status(404)
        .json({ message: "Unable to add tracked pumping. Please try later!" });
    }
  } catch (err) {
    return next(err);
  }
}

export async function getFeedDetails(req, res, next) {
  try {
    const getFeedDetails = await getFeedDetailsModel(
      req.query.feed_giver,
      req.query.feed_taker,
      req.query.feed_count
    );
    if (getFeedDetails && getFeedDetails.length > 0) {
      res.status(200).json(getFeedDetails);
    } else {
      res.status(404).json({ message: "No matching feeds found" });
    }
  } catch (err) {
    return next(err);
  }
}

export async function getPumpedFeed(req, res, next) {
  try {
    const getPumpedFeed = await getPumpedDetailsModel(
      req.query.feed_giver,
      req.query.feed_taker
    );
    if (getPumpedFeed && getPumpedFeed.length > 0) {
      res.status(200).json(getPumpedFeed);
    } else {
      res.status(404).json({ message: "No matching pumped feeds found" });
    }
  } catch (err) {
    return next(err);
  }
}

export async function deleteTrackedFeed(req, res, next) {
  try {
    const deleteFeed = await deleteTrackedFeedModel(req.params.feedId);
    if (deleteFeed.acknowledged && deleteFeed.deletedCount === 1) {
      res.status(200).json({ message: "Feed deleted successfully" });
    } else {
      res
        .status(404)
        .json({ message: "Unable to delete feed. Please try again later!" });
    }
  } catch (err) {
    return next(err);
  }
}

export async function getFeedForId(req, res, next) {
  try {
    const getFeedForId = await getFeedByIdModel(req.params.feedId);
    if (getFeedForId && Object.keys(getFeedForId).length > 0) {
      res.status(200).json(getFeedForId);
    } else {
      res
        .status(404)
        .json({ message: "Unable to get feed. Please try again later!" });
    }
  } catch (err) {
    return next(err);
  }
}

export async function saveEditedFeed(req, res, next) {
  try {
    const feedTimeTaken = moment(req.body.feedEnd, "DD/MM/YYYY HH:mm:ss").diff(
      moment(req.body.feedStart, "DD/MM/YYYY HH:mm:ss"),
      "seconds"
    );
    const updateQuery = {
      feed_quantity: req.body.feedQuantity,
      feed_start_time: req.body.feedStart,
      feed_end_time: req.body.feedEnd,
      feed_taken_time: feedTimeTaken,
    };
    const saveEditedFeed = await saveEditedFeedModel(
      { _id: req.body.feedId },
      updateQuery
    );
    if (saveEditedFeed.hasOwnProperty("_id")) {
      res.status(200).json({ message: `Feed edited!` });
    } else {
      res
        .status(404)
        .json({ message: "Unable to edit feed. Please try later!" });
    }
  } catch (err) {
    return next(err);
  }
}
