import moment from "moment";
import {
  firstLoginModel,
  addCareTakenModel,
  getCareTakenDetailsModel,
  changeCareTakenModel,
} from "../models/caretakenModel.js";

export async function firstLogin(req, res, next) {
  try {
    const firstLogin = await firstLoginModel(req.user.user_email);
    if (firstLogin > 0) {
      res.send(false);
    } else {
      res.send(true);
    }
  } catch (err) {
    return next(err);
  }
}

export async function addCareTaken(req, res, next) {
  try {
    const addCareTaken = await addCareTakenModel({
      care_giver: req.user.user_email,
      care_taken_of: req.body.care_taken_of,
      care_taken_name: req.body.care_taken_name,
      care_taken_dob: moment(req.body.care_taken_dob, "DD/MM/YYYY HH:mm:ss").format(
        "MM/DD/YYYY HH:mm:ss"
      ),
      care_taken_gender: req.body.care_taken_gender,
      care_taken_added_time: moment().format("MM/DD/YYYY HH:mm:ss"),
      care_last_accessed: true,
    });
    if (addCareTaken.hasOwnProperty("_id")) {
      res.status(200).json({
        message: `Care can now be provided to ${req.body.care_taken_name}`,
        addedCareTaken: addCareTaken,
      });
    } else {
      res
        .status(404)
        .json({ message: "Unable to add details. Please try later!" });
    }
  } catch (err) {
    return next(err);
  }
}

export async function getCareTakenDetails(req, res, next) {
  try {
    const careTakenDetails = await getCareTakenDetailsModel(
      req.user.user_email
    );
    if (careTakenDetails && careTakenDetails.length > 0) {
      res.status(200).json(careTakenDetails);
    } else {
      res.status(404).json({ message: "No matching records found" });
    }
  } catch (err) {
    return next(err);
  }
}

export async function changeCareTaken(req, res, next) {
  try {
    const changeCareTaken = await changeCareTakenModel(
      req.body.care_taken_id,
      req.body.care_giver
    );
    console.log(changeCareTaken);
    if (changeCareTaken && Object.keys(changeCareTaken).length > 0) {
      res.status(200).json(changeCareTaken);
    } else {
      res.status(404).json({ message: "Unable to change care taken" });
    }
  } catch (err) {
    return next(err);
  }
}
