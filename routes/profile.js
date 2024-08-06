const express = require("express");
const profile = express.Router();
const Users = require("../models").Users;
const bcrypt = require("bcrypt");

function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      // Forward error to the global error handler
      next(error);
    }
  };
}

profile.get(
  "/profile",
  asyncHandler(async (req, res) => {
    const isLoggedIn = req.session.isLoggedIn;
    if (!isLoggedIn) {
      return res.redirect("/");
    }

    const userNameDB = await Users.findOne({
      where: { username: req.session.userid },
    });

    console.log(userNameDB);

    return res.render("profile", {
      profileUser: req.session.userid,
      username: userNameDB.username,
      email: userNameDB.email,
    });
  })
);

profile.post(
  "/profileReq",
  asyncHandler(async (req, res) => {})
);

module.exports = profile;
