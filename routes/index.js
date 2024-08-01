const express = require("express");
const router = express.Router();
const Users = require("../models").Users;
const bcrypt = require("bcrypt");

//req.session.role = 'admin';

//const fs = require("node:fs");  a utiliser pour chercher des fichiers en local (json,ext...)

// pour ne pas reecrire try catch a chaque fois
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

//base

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const isLoggedIn = req.session.isLoggedIn;
    if (!isLoggedIn) {
      res.render("initial");
    }
    res.render("home");
  })
);

router.get(
  "/login",
  asyncHandler(async (req, res) => {
    const isLoggedIn = req.session.isLoggedIn;
    if (isLoggedIn) {
      res.render("home");
    }
    res.render("initial");
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const userNameDB = await Users.findOne({
      where: { username: username },
    });

    if (userNameDB) {
      const passwordValid = await bcrypt.compare(password, userNameDB.password);

      if (passwordValid) {
        req.session.userid = username;
        req.session.isLoggedIn = true;
        res.redirect("/home");
      } else {
        res.status(400).json({ error: "Password Incorrect" });
      }
    } else {
      res.status(404).json({ error: "User does not exist" });
    }
  })
);

router.get(
  "/register",
  asyncHandler(async (req, res) => {
    res.render("register");
  })
);

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { username, password, email } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const user = await Users.create({
      username: username,
      email: email,
      password: hash,
    });
    res.redirect("/profile");
  })
);

router.get(
  "/profile",
  asyncHandler(async (req, res) => {
    const isLoggedIn = req.session.isLoggedIn;
    if (!isLoggedIn) {
      res.render("initial");
    }
    res.render("profile");
  })
);

router.get(
  "/home",
  asyncHandler(async (req, res) => {
    const isLoggedIn = req.session.isLoggedIn;
    if (!isLoggedIn) {
      res.render("initial");
    }
    res.render("home");
  })
);

module.exports = router;
