import { userModel } from "../models/userModel.js";

export async function addUser(req, res, next) {
  try {
  userModel.register(new userModel({ username: req.body.email,
     user_email: req.body.email, 
        user_fullname: req.body.fullname }), 
      req.body.password, (err, user) => {
    if(err) {
      console.log(err);
      return res.status(500).json({ message: err})
    }
    res.status(200).json({ message: 'success'});
  })
  } catch (err) {
    return next(err);
  }
}

export async function loginUser(req, res, next) {
  try {
      res.cookie("sessionId", req.sessionID);
      res.redirect("/caretaken/is-first-login")
  } catch (err) {
    return next(err);
  }
}

export async function logoutUser(req, res, next) {
    req.logout((err) => {
      if(err) return next(err);
      res.status(200).json({ message: 'Logged out' });
    })
}
