import moment from "moment";
import {
  firstLoginModel,
  addRoleModel,
  getRoleDetailsModel,
} from "../models/roleModel.js";

export async function firstLogin(req, res, next) {
  try {
    const firstLogin = await firstLoginModel(req.query.giver_email);
    if (firstLogin == 1) {
      res.send(false);
    } else {
      res.send(true);
    }
  } catch (err) {
    return next(err);
  }
}

export async function addRole(req, res, next) {
  try {
    const addRole = await addRoleModel({
      care_giver: req.body.care_giver,
      care_taken_of: req.body.care_taken_of,
      care_taken_name: req.body.care_taken_name,
      care_taken_dob: moment(req.body.care_taken_dob).format(
        "MM/DD/YYYY HH:mm:ss"
      ),
      care_taken_gender: req.body.care_taken_gender,
      care_taken_added_time: moment().format("DD/MM/YYYY HH:mm:ss"),
      care_last_accessed: true,
    });
    if (addRole.hasOwnProperty("_id")) {
      res.status(200).json({
        message: `Care can now be provided to ${req.body.care_taken_name}`,
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

export async function getRoleDetails(req, res, next) {
  try {
    const roleDetails = await getRoleDetailsModel(req.query.giver_email);
    if (roleDetails && Object.keys(roleDetails).length > 0) {
      res.status(200).json(roleDetails);
    } else {
      res.status(404).json({ message: "No matching records found" });
    }
  } catch (err) {
    return next(err);
  }
}
