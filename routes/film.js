const express = require("express");
const profile = express.Router();
const Users = require("../models").Users;

const db = new sqlite3.Database('./movies.db');

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

film.get(
 "/film/:id",
 asyncHandler(async (req, res) => {
 const title 
 const year
 const duration
 const director
 const actors
 const synopsis
 const genres
 
 db.all 

app.get("/users", (req, res) => {
  // Assuming you have a function to query your database
  database.getUsers((err, users) => {
    if (err) {
      // Handle error
    } else {
      res.render("users", { users: users });
    }
  });
});

// Set up Pug as the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views')));
