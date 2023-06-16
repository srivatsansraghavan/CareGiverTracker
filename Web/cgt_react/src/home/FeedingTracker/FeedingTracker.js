import React, { useState, useEffect } from "react";
import ftstyles from "./FeedingTracker.module.css";
import Modal from "../../shared/Modal";
import { Button } from "@mui/material";
import axios from "axios";
import { feedingOptions } from "./FeedingTrackerOptions";
import FeedingList from "./FeedingList";

function FeedingTracker({ user, caretaken }) {
  const [showFeedModal, setShowFeedModal] = useState(false);
  const [feedingType, setFeedingType] = useState("");
  const [feedingMode, setFeedingMode] = useState("");
  const [feedingSide, setFeedingSide] = useState("");
  const [feedingQuantity, setFeedingQuantity] = useState(0);
  const [isFormNotValid, setIsFormNotValid] = useState(true);
  const [isTrackingFeed, setIsTrackingFeed] = useState("Start Tracking");
  const [canStartTracking, setCanStartTracking] = useState(true);
  const [showTimer, setShowTimer] = useState(false);
  const [feedingGrouped, setFeedingGrouped] = useState({});
  const addFeed = () => {
    setShowFeedModal(true);
  };

  const closeFeedModal = () => {
    setShowFeedModal(false);
  };

  const axiosClient = axios.create({
    baseURL: "http://localhost:3000/",
  });

  useEffect(() => {
    axiosClient
      .get(
        `/feed/get-feed-details?feed_giver=${user}&feed_taker=${caretaken.care_taken_id}&feed_count=10`
      )
      .then((response) => {
        if (response.status === 200) {
          let feedGrouped = {};
          for (let responseItem of response.data) {
            let responseDetails = {};
            let endDate;
            responseDetails["id"] = responseItem._id;
            if (responseItem.hasOwnProperty("pumped_mode")) {
              endDate = responseItem.pump_end_time.split("T")[0];
              responseDetails["pumpedMode"] = responseItem.pumped_mode;
              responseDetails["pumpedSide"] = responseItem.pumped_side;
              responseDetails["pumpedQuantity"] = responseItem.pumped_quantity;
              responseDetails["pumpedStartDate"] =
                responseItem.pump_start_time.split("T")[0];
              responseDetails["pumpedStartTime"] =
                responseItem.pump_start_time.split("T")[1];
              responseDetails["pumpedEndDate"] = endDate;
              responseDetails["pumpedEndTime"] =
                responseItem.pump_end_time.split("T")[1];
              responseDetails["pumpedTimeTaken"] = responseItem.pumped_time;
            }
            if (responseItem.hasOwnProperty("feed_taken_mode")) {
              responseDetails["type"] = responseItem.feed_taken_type;
              responseDetails["mode"] = responseItem.feed_taken_mode;
              responseDetails["side"] = responseItem.feed_taken_side;
              responseDetails["quantity"] = responseItem.feed_quantity;
              endDate = responseItem.feed_end_time.split("T")[0];
              responseDetails["startDate"] = new Date(
                responseItem.feed_start_time
              ).toLocaleString();
              responseDetails["endDate"] = new Date(
                responseItem.feed_end_time
              ).toLocaleString();
              responseDetails["timeTaken"] = responseItem.feed_taken_time;
            }
            if (!feedGrouped.hasOwnProperty(endDate)) {
              feedGrouped[endDate] = [];
            }
            let feedGroupSize = feedGrouped[endDate].length;
            feedGrouped[endDate][feedGroupSize] = responseDetails;
          }
          setFeedingGrouped(feedGrouped);
          // setAddUserResponse(response.data.message);
          // localStorage.setItem("access_token", response.data.access_token);
          // setShowSignUpModal(false);
          // passLoginState(true, email);
          // navigate("/home", { state: { loggedIn: true, loginEmail: email } });
        } else {
          // setAddUserResponse(response.data.message);
          // navigate("/");
        }
      });
  }, [showFeedModal]);
  const validateStartTracking = useEffect(() => {
    if (feedingType !== "" && feedingMode !== "") {
      setCanStartTracking(false);
    } else {
      setCanStartTracking(true);
    }
  }, [feedingType, feedingMode]);

  const validateAddFeedForm = useEffect(() => {
    if (feedingType !== "" && feedingMode !== "" && feedingQuantity !== "") {
      setIsFormNotValid(false);
    } else {
      setIsFormNotValid(true);
    }
  }, [feedingType, feedingMode, feedingQuantity]);

  const trackFeedFields = [
    {
      fieldLabel: "Feed Type",
      fieldType: "dropdown",
      fieldId: "feedingType",
      fieldName: "feedingType",
      fieldState: feedingType,
      fieldSetState: (value) => {
        setFeedingType(value);
        setFeedingMode("");
        setFeedingSide("");
        setFeedingQuantity(0);
      },
      fieldItems: Object.keys(feedingOptions[caretaken.care_taken_type]).map(
        (type) => {
          return { value: type, text: type };
        }
      ),
    },
  ];

  {
    feedingType !== "" &&
      trackFeedFields.push({
        fieldLabel: "Feed Mode",
        fieldType: "dropdown",
        fieldId: "feedingMode",
        fieldName: "feedingMode",
        fieldState: feedingMode,
        fieldSetState: (value) => {
          setFeedingMode(value);
          setFeedingSide("");
          setFeedingQuantity(0);
        },
        fieldItems: feedingOptions[caretaken.care_taken_type][feedingType].map(
          (mode) => {
            return { value: mode, text: mode };
          }
        ),
      });
  }

  {
    feedingType !== "" &&
      ["Breast Pump", "Breast Feed"].includes(feedingType) &&
      trackFeedFields.push({
        fieldLabel: "Feed Side",
        fieldType: "dropdown",
        fieldId: "feedingSide",
        fieldName: "feedingSide",
        fieldState: feedingSide,
        fieldSetState: (value) => {
          setFeedingSide(value);
        },
        fieldItems: [
          {
            value: "Left Side",
            text: "Left Side",
          },
          {
            value: "Right Side",
            text: "Right Side",
          },
          {
            value: "Both Sides",
            text: "Both Sides",
          },
        ],
      });
  }

  {
    feedingType !== "" &&
      feedingMode !== "" &&
      trackFeedFields.push({
        fieldLabel: "Feed Quantity",
        fieldType: "number",
        fieldId: "feedingQuantity",
        fieldName: "feedingQuantity",
        fieldState: feedingQuantity,
        fieldSetState: (value) => {
          setFeedingQuantity(value);
        },
      });
  }

  const trackFeed = () => {
    if (isTrackingFeed === "Start Tracking") {
      setIsTrackingFeed("Stop Tracking");
      setShowTimer(true);
    } else {
      setIsTrackingFeed("Start Tracking");
      setShowTimer(false);
    }
  };

  const trackFeedFooter = [
    {
      type: "button",
      text: isTrackingFeed,
      buttonId: "addFeedTrack",
      isNotValid: canStartTracking,
      onClick: trackFeed,
    },
    {
      text: "Feed Time Taken",
      type: "timer",
      fieldId: "feedTimeTaken",
      show: showTimer,
      outputTimeId: "feedingTimeTaken",
    },
    {
      type: "submit",
      text: "Save & Close",
      buttonId: "addFeedSubmit",
      isNotValid: isFormNotValid,
    },
    {
      type: "button",
      text: "Close",
      onClick: closeFeedModal,
      buttonId: "addFeedClose",
      isNotValid: false,
    },
  ];

  const saveTrackedFeed = (event) => {
    const feedTime = document.getElementById("feedingTimeTaken").innerText;
    axiosClient
      .post("/feed/save-tracking-feed", {
        feedGiver: user,
        feedTaker: {
          name: caretaken.care_taken_name,
          id: caretaken.care_taken_id,
        },
        feedType: feedingType,
        feedMode: feedingMode,
        feedSide: feedingSide,
        feedTime: feedTime,
        feedQuantity: feedingQuantity,
      })
      .then((response) => {
        if (response.status === 200) {
          //  setAddUserResponse(response.data.message);
          setShowFeedModal(false);
        } else {
          // setAddUserResponse(response.data.message);
        }
      });
  };
  return (
    <>
      <div className={ftstyles.feedingContainer}>
        <Button variant="contained" size="medium" onClick={addFeed}>
          Add Feed
        </Button>
        <ul>
          {Object.entries(feedingGrouped).map(
            ([feedingGroupKey, feedingGroupValue]) => (
              <li className={ftstyles.feedPerDate}>
                <time dateTime={feedingGroupKey} className={ftstyles.feedDate}>
                  {feedingGroupKey}
                </time>
                <ul className={ftstyles.feedDateTimeline}>
                  {feedingGroupValue.map((feedGroup) => (
                    <FeedingList
                      className={ftstyles.trackedFeedTimeline}
                      feedContent={feedGroup}
                    ></FeedingList>
                  ))}
                </ul>
              </li>
            )
          )}
        </ul>
      </div>
      {showFeedModal && (
        <Modal
          show={showFeedModal}
          title="Add Feed"
          formId="addFeedForm"
          formFields={trackFeedFields}
          formFooter={trackFeedFooter}
          onAction={saveTrackedFeed}
        />
      )}
    </>
  );
}

export default FeedingTracker;
