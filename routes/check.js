const express = require("express");
const check = express.Router();
const Users = require("../models").Users;

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

check.post(
  "/usernameCheck",
  asyncHandler(async (req, res) => {
    const username = req.body.input;
    const userNameDB = await Users.findOne({
      where: { username: username },
    });
    console.log(userNameDB);
    if (userNameDB) {
      const text = "user already exist";
      return res.send(text);
    } else {
      const text = "";
      return res.send(text);
    }
  })
);

check.post(
  "/emailCheck",
  asyncHandler(async (req, res) => {
    const email = req.body.input;
    const userNameDB = await Users.findOne({
      where: { email: email },
    });
    console.log(userNameDB);
    console.log("here");
    if (userNameDB) {
      const text = "email already exist";
      return res.send(text);
    } else {
      const text = "";
      return res.send(text);
    }
  })
);

module.exports = check;
