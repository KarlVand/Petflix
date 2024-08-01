const express = require("express");
const testing = express.Router();

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

testing.get(
  "/test",
  asyncHandler(async (req, res) => {
    res.render("test");
  })
);

testing.post(
  "/test",
  asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const htmlResponse = `<h1>Nom: ${username}</h1><h1>Password: ${password}</h1>`;
    res.send(htmlResponse);
  })
);

module.exports = testing;
