const express = require("express");
const search = express.Router();
const { Movies } = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

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

search.get(
  "/search",
  asyncHandler(async (req, res) => {
    return res.render("search");
  })
);

search.post(
  "/search",
  asyncHandler(async (req, res) => {
    console.log(req.body);

    const movies = await Movies.findAll({
      where: {
        title: {
          [Sequelize.Op.like]: `${req.body.query}%`,
        },
      },
      limit: 10, // Limit the results to 10 movies

      raw: true,
    });

    const moviesArr = movies.map((movie) => movie.title);
    console.log(moviesArr);
    return res.json(moviesArr);
  })
);

module.exports = search;
