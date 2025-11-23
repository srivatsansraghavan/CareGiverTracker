import express from "express";
const app = express();
import cors from "cors";
import pkg from "body-parser";
const { json } = pkg;
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import LocalStrategy from "passport-local";
import flash from "express-flash";
import { userModel } from "./models/userModel.js"

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser())
app.use(session({ secret: 'secret', resave: true, saveUninitialized: false, cookie: { secure: false }}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
passport.use(new LocalStrategy({ usernameField: 'user_email' }, userModel.authenticate()))
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser())

import user from "./routes/user.js";
import caretaken from "./routes/caretaken.js";
import feed from "./routes/feed.js";
import excretion from "./routes/excretion.js";
import inventory from "./routes/inventory.js";
import medication from "./routes/medication.js";
import base from "./routes/base.js";

app.use("/user", user);
app.use("/caretaken", caretaken);
app.use("/feed", feed);
app.use("/excretion", excretion);
app.use("/inventory", inventory);
app.use("/medication", medication);
app.use("/base", base);

app.use((err, req, res, next) => {
  if(err.name === "MongoServerError") {
    if(err.code === 11000) {
      return res.status(409).json({ message: 'Duplicate values found' });
    }
    return res.status(500).json({ message: 'Database error' });
  }
  res.status(500).json({ message: err.message })
});

app.listen(process.env.NODE_PORT, () => {
  console.log(`Caregiver tracker listening on port ${process.env.NODE_PORT}!`);
});
