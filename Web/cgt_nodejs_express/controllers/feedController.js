import { connectToMongoDBGetTable, cgtdbEnv } from "../config.js";
import moment from "moment";
import { ObjectId } from "mongodb";

export async function saveTrackingFeed(req, res, next) {
  try {
    const collection = await connectToMongoDBGetTable(
      cgtdbEnv[process.env.NODE_ENV],
      "tbl_feeding"
    );
    let addTrackedFeed;
    let feedEndTime = moment().format("DD/MM/YYYY HH:mm:ss");
    let feedStartTime = moment(feedEndTime, "DD/MM/YYYY HH:mm:ss")
      .subtract(req.body.feedTime, "seconds")
      .format("DD/MM/YYYY HH:mm:ss");
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
      addTrackedFeed = await collection.updateOne(
        { _id: ObjectId(req.body.pumpedFeedId) },
        { $set: insertQuery }
      );
    } else {
      addTrackedFeed = await collection.insertOne(insertQuery);
    }
    if (addTrackedFeed.acknowledged) {
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
    const collection = await connectToMongoDBGetTable(
      cgtdbEnv[process.env.NODE_ENV],
      "tbl_feeding"
    );
    let feedEndTime = moment().format("DD/MM/YYYY HH:mm:ss");
    let feedStartTime = moment(feedEndTime, "DD/MM/YYYY HH:mm:ss")
      .subtract(req.body.feedTime, "seconds")
      .format("DD/MM/YYYY HH:mm:ss");
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
    const addPumpedFeed = await collection.insertOne(insertQuery);
    if (addPumpedFeed.acknowledged) {
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
    const collection = await connectToMongoDBGetTable(
      cgtdbEnv[process.env.NODE_ENV],
      "tbl_feeding"
    );
    const getFeedDetails = await collection
      .find({
        $or: [
          {
            $and: [
              {
                feed_giver: req.query.feed_giver,
                feed_taker_id: req.query.feed_taker,
              },
            ],
          },
          {
            $and: [
              {
                pumped_by: req.query.feed_giver,
                pumped_for_id: req.query.feed_taker,
              },
            ],
          },
        ],
      })
      .limit(10)
      .sort({ _id: -1 })
      .toArray();
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
    const collection = await connectToMongoDBGetTable(
      cgtdbEnv[process.env.NODE_ENV],
      "tbl_feeding"
    );
    const getPumpedFeed = await collection
      .find({
        pumped_by: req.query.feed_giver,
        pumped_for_id: req.query.feed_taker,
        is_pumped_feed: true,
        is_feed_given: false,
      })
      .sort({ _id: -1 })
      .toArray();
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
    const collection = await connectToMongoDBGetTable(
      cgtdbEnv[process.env.NODE_ENV],
      "tbl_feeding"
    );
    const deleteFeed = await collection.deleteOne({
      _id: ObjectId(req.params.feedId),
    });
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
    const collection = await connectToMongoDBGetTable(
      cgtdbEnv[process.env.NODE_ENV],
      "tbl_feeding"
    );
    const getFeedForId = await collection.findOne({
      _id: ObjectId(req.params.feedId),
    });
    if (getFeedForId && Object.keys(getFeedForId).length > 0) {
      res.status(200).json(getFeedForId);
    } else {
      res
        .status(404)
        .json({ message: "Unable to get feed. Please try again later!" });
    }
  } catch (err) {
    console.log(err);
  }
}

export async function saveEditedFeed(req, res, next) {
  try {
    const collection = await connectToMongoDBGetTable(
      cgtdbEnv[process.env.NODE_ENV],
      "tbl_feeding"
    );
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
    const saveEditedFeed = await collection.updateOne(
      { _id: ObjectId(req.body.feedId) },
      { $set: updateQuery }
    );
    if (saveEditedFeed.acknowledged) {
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
