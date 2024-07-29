const express = require("express");
const router = express.Router();

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
    res.render("index");
  })
);

module.exports = router;
