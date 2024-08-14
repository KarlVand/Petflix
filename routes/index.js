const express = require("express");
const router = express.Router();
const { Users, ProfileUser, ProfileIcon } = require("../models");
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
    if (typeof req.session.register === "string") {
      return res.redirect("/profilecreate");
    }
    if (!req.session.profileSelect) {
      return res.redirect("/profileselect");
    }
    return res.redirect("/home");
  })
);

router.get(
  "/login",
  asyncHandler(async (req, res) => {
    const isLoggedIn = req.session.isLoggedIn;
    if (isLoggedIn && typeof req.session.register !== "string") {
      return res.redirect("/home");
    } else if (isLoggedIn && typeof req.session.register === "string") {
      return res.redirect("/profilecreate");
    }
    if (!req.session.profileSelect) {
      return res.redirect("/profileselect");
    }
    return res.redirect("/");
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    try {
      const { username, password } = req.body;

      const userNameDB = await Users.findOne({
        where: { username: username },
      });

      if (!userNameDB) {
        return res.send("User does not exist");
      }

      const passwordValid = await bcrypt.compare(password, userNameDB.password);

      if (!passwordValid) {
        return res.send("Password Incorrect");
      }

      // Mettre à jour la session utilisateur
      req.session.userid = username;
      req.session.isLoggedIn = true;

      // Vérifier si l'utilisateur a un profil principal avec une icône
      const mainProfileWithIcon = await ProfileUser.findOne({
        where: { userId: userNameDB.id, profileNumber: 1 },
        raw: true,
      });

      if (mainProfileWithIcon) {
        req.session.register = true;
      } else {
        req.session.register = userNameDB.username;
      }

      // Redirection en fonction de l'état de l'inscription
      if (typeof req.session.register === "string") {
        return res.redirect("/profilecreate");
      } else {
        return res.redirect("/profileselect");
      }
    } catch (error) {
      console.error(
        "Internal Server Error during login for user:",
        req.body.username,
        error
      );
      return res.status(500).send("Internal Server Error");
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
    const newsletterSubscription = !!newsletter && newsletter === "on";
    const user = await Users.create({
      username: username,
      email: email,
      password: hash,
      newsletter: newsletterSubscription,
    });
    req.session.register = username;
    return res.redirect("/profilecreate");
  })
);

router.get(
  "/logout",
  asyncHandler(async (req, res) => {
    req.session.destroy(err => {
      if (err) {
        return res.redirect("/");
      }
      res.clearCookie("connect.sid");
      res.redirect("/");
    });
  })
);

router.post(
  "/logout",
  asyncHandler(async (req, res) => {
    req.session.destroy(err => {
      if (err) {
        return res.redirect("/");
      }
      res.clearCookie("connect.sid");
      res.redirect("/");
    });
  })
);

router.get(
  "/home",
  asyncHandler(async (req, res) => {
    const isLoggedIn = req.session.isLoggedIn;
    if (!isLoggedIn || typeof req.session.register === "string") {
      return res.redirect("/");
    }
    if (!req.session.profileSelect) {
      return res.redirect("/profileselect");
    }
    return res.render("home");
  })
);

module.exports = router;
