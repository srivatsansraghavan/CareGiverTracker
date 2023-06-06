import { hash, compare } from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
const { sign } = jsonwebtoken;
import fs from "fs";
import moment from "moment";
const privateKey = fs.readFileSync("./private.key");
import { addUserModel, getPassword } from "../models/userModel.js";

export async function addUser(req, res, next) {
  try {
    const hashedPasswords = await hash(req.body.password, 10);
    const addedUsers = await addUserModel({
      user_email: req.body.email,
      user_fullname: req.body.fullname,
      user_password: hashedPasswords,
      user_signup_time: moment().format("DD/MM/YYYY HH:mm:ss"),
    });
    if (addedUsers.hasOwnProperty("_id")) {
      const jwToken = sign({}, privateKey, {
        algorithm: "RS256",
        allowInsecureKeySizes: true,
        expiresIn: 3600,
        subject: req.body.email,
      });
      res.status(200).json({
        access_token: jwToken,
        message: "User created successfully!",
      });
    } else {
      res.status(404).send("Unable to add user. Please try again!");
    }
  } catch (err) {
    return next(err);
  }
}

export async function loginUser(req, res, next) {
  try {
    const userPassword = await getPassword(req.body.email);
    const verifyPassword = await compare(
      req.body.password,
      userPassword.user_password
    );
    if (verifyPassword) {
      const jwToken = sign({}, privateKey, {
        algorithm: "RS256",
        allowInsecureKeySizes: true,
        expiresIn: 3600,
        subject: req.body.email,
      });
      res.status(200).json({
        access_token: jwToken,
        message: "User signed in successfully!",
      });
    } else {
      res.status(404).send("Incorrect password!");
    }
  } catch (err) {
    return next(err);
  }
}
