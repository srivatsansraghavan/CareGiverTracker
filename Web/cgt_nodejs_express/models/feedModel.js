import { connectToMongoDB, cgtdbEnv } from "../config.js";

async function getFeedSchema() {
  const feedTable = await connectToMongoDB(cgtdbEnv[process.env.NODE_ENV]);

  const feedSchema = await feedTable.Schema({
    feed_giver: {
      type: String,
      required: [true, "Care Giver Id is required"],
    },
    feed_taker_name: {
      type: String,
      required: [true, "Care Taken Name is required"],
    },
    feed_taker_id: {
      type: String,
      required: [true, "Care Taken of Id is required"],
    },
    feed_taken_type: {
      type: String,
      required: [true, "Feed Type is required"],
    },
    feed_taken_mode: {
      type: String,
      required: [true, "Feed mode is required"],
    },
    feed_taken_side: {
      type: String,
    },
    feed_taken_time: {
      type: Number,
      required: [true, "Feed taken time is required"],
    },
    feed_quantity: {
      type: Number,
      required: [true, "Feed quantity is required"],
    },
    feed_start_time: {
      type: Date,
    },
    feed_end_time: {
      type: Date,
    },
    is_pumped_feed: {
      type: Boolean,
    },
    is_feed_given: {
      type: Boolean,
      default: true,
    },
  });

  return (
    feedTable.models["tbl_feeding"] ||
    feedTable.model("tbl_feeding", feedSchema)
  );
}

async function getPumpedSchema() {
  const pumpedTable = await connectToMongoDB(cgtdbEnv[process.env.NODE_ENV]);

  const pumpedSchema = await pumpedTable.Schema({
    pumped_by: {
      type: String,
      required: [true, "Care Giver Email is required"],
    },
    pumped_for_name: {
      type: String,
      required: [true, "Care Taken Name is required"],
    },
    pumped_for_id: {
      type: String,
      required: [true, "Care Taken of Id is required"],
    },
    pumped_mode: {
      type: String,
      required: [true, "Pumped mode is required"],
    },
    pumped_side: {
      type: String,
      required: [true, "Pumped side is required"],
    },
    pumped_time: {
      type: Number,
      required: [true, "Pumped taken time is required"],
    },
    pumped_quantity: {
      type: Number,
      required: [true, "Pumped quantity is required"],
    },
    pump_start_time: {
      type: Date,
    },
    pump_end_time: {
      type: Date,
    },
  });

  return (
    pumpedTable.models["tbl_feeding"] ||
    pumpedTable.model("tbl_feeding", pumpedSchema)
  );
}

export const saveTrackedFeedModel = async function (query) {
  const feedModel = await getFeedSchema();
  const addedFeed = await new feedModel(query).save();
  return JSON.parse(JSON.stringify(addedFeed));
};

export const savePumpedModel = async function (query) {
  const pumpedModel = await getPumpedSchema();
  const pumpedFeed = await new pumpedModel(query).save();
  return JSON.parse(JSON.stringify(pumpedFeed));
};

export const saveFeedForPumpedModel = async function (finder, updated) {
  const feedModel = await getFeedSchema();
  const updatedFeed = await feedModel.findOneAndUpdate(
    finder,
    { $set: updated },
    {
      new: true,
    }
  );
  return JSON.parse(JSON.stringify(updatedFeed));
};

export const getFeedDetailsModel = async function (
  care_giver,
  care_taken_of_id,
  feed_count
) {
  const feedModel = await getFeedSchema();
  const getFeedDetails = await feedModel
    .find(
      {
        $or: [
          {
            $and: [
              {
                feed_giver: care_giver,
                feed_taker_id: care_taken_of_id,
              },
            ],
          },
          {
            $and: [
              {
                pumped_by: care_giver,
                pumped_for_id: care_taken_of_id,
              },
            ],
          },
        ],
      },
      null,
      { limit: feed_count }
    )
    .sort({ _id: -1 })
    .exec();
  return getFeedDetails;
};

export const getPumpedDetailsModel = async function (
  care_giver_email,
  care_taken_of_id
) {
  const pumpedModel = await getPumpedSchema();
  const getPumpedDetails = await pumpedModel
    .find(
      {
        pumped_by: care_giver_email,
        pumped_for_id: care_taken_of_id,
        is_pumped_feed: true,
        is_feed_given: false,
      },
      null
    )
    .sort({ _id: -1 })
    .exec();
  return getPumpedDetails;
};

export const deleteTrackedFeedModel = async function (feedId) {
  const feedModel = await getFeedSchema();
  const deleteFeed = await feedModel
    .deleteOne({
      _id: feedId,
    })
    .exec();
  return deleteFeed;
};

export const getFeedByIdModel = async function (feedId) {
  const feedModel = await getFeedSchema();
  const getFeedById = await feedModel
    .findOne({
      _id: feedId,
    })
    .exec();
  return getFeedById;
};

export const saveEditedFeedModel = async function (finder, updated) {
  const feedModel = await getFeedSchema();
  const editedFeed = await feedModel.findOneAndUpdate(
    finder,
    { $set: updated },
    {
      new: true,
    }
  );
  return JSON.parse(JSON.stringify(editedFeed));
};
