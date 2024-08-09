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
      return res.render("initial");
    }
    return res.redirect("/home");
  })
);

router.get(
  "/login",
  asyncHandler(async (req, res) => {
    const isLoggedIn = req.session.isLoggedIn;
    if (isLoggedIn) {
      return res.redirect("/home");
    }
    return res.redirect("/");
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const userNameDB = await Users.findOne({
      where: { username: username },
    });
    console.log(req.body);

    if (userNameDB) {
      const passwordValid = await bcrypt.compare(password, userNameDB.password);

      if (passwordValid) {
        req.session.userid = username;
        req.session.isLoggedIn = true;
        return res.redirect("/home");
      } else {
        const htmlResponse = "Password Incorrect";
        return res.send(htmlResponse);
      }
    } else {
      const htmlResponse = "User does not exist";
      return res.send(htmlResponse);
    }
  })
);

router.get(
  "/register",
  asyncHandler(async (req, res) => {
    return res.render("register");
  })
);

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    console.log(req.body);
    const { username, password, email, newsletter } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const newsletterSubscription = !!newsletter && newsletter === 'on';
    const user = await Users.create({
      username: username,
      email: email,
      password: hash,
      newsletter: newsletterSubscription,
    });
    return res.redirect("/");
  })
);

router.get(
  "/home",
  asyncHandler(async (req, res) => {
    const isLoggedIn = req.session.isLoggedIn;
    if (!isLoggedIn) {
      return res.redirect("/");
    }
    return res.render("home");
  })
);

module.exports = router;
