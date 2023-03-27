const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dbConfig = require("../config");
const fs = require("fs");
const privateKey = fs.readFileSync("./private.key");
const moment = require("moment");

router.post("/add-users", async (req, res) => {
  try {
    const collection = await dbConfig.connectToMongoDBGetTable(
      dbConfig.cgtdbEnv[process.env.NODE_ENV],
      "tbl_users"
    );
    const hashedPasswords = await bcrypt.hash(req.body.password, 10);
    const signUpUser = await collection.insertOne({
      user_email: req.body.email,
      user_fullname: req.body.fullname,
      user_password: hashedPasswords,
      user_signup_time: moment().format("DD/MM/YYYY HH:mm:ss"),
    });
    if (signUpUser.acknowledged) {
      const jwToken = jwt.sign({}, privateKey, {
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
    console.log(err);
  }
});

router.post("/login-user", async (req, res) => {
  try {
    const collection = await dbConfig.connectToMongoDBGetTable(
      dbConfig.cgtdbEnv[process.env.NODE_ENV],
      "tbl_users"
    );
    const userPassword = await collection.findOne({
      user_email: req.body.email,
    });
    const verifyPassword = await bcrypt.compare(
      req.body.password,
      userPassword.user_password
    );
    if (verifyPassword) {
      const jwToken = jwt.sign({}, privateKey, {
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
    console.log(err);
  }
});

module.exports = router;
