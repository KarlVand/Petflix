const express = require("express");
const backend = express.Router();
const { Movies } = require("../models/movies"); // Assurez-vous que le chemin est correct

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

// Route de base
backend.get(
  "/backend",
  asyncHandler(async (req, res, next) => {
    try {
      res.cookie("hello", "hi!");
      res.render("backend");
    } catch (error) {
      console.error("Error rendering backend view:", error);
      res.status(500).send("Error rendering backend view");  // Assure-toi qu'un statut est envoyé
      next(error); // Passe l'erreur au middleware de gestion des erreurs
    }
  })
);



// Route de recherche
backend.get(
  "/search",
  asyncHandler(async (req, res) => {
    try {
      const { query } = req.query;
      console.log("Received query:", query); // Debug

      if (!query) {
        return res.status(200).json([]);  // Assurer un statut 200 correct
      }

      const movies = await Movies.findAll({
        where: {
          original_title: {
            [sequelize.Op.like]: `%${query}%`,
          },
        },
        limit: 10,
      });

      return res.status(200).json(movies.map((movie) => movie.original_title));  // Toujours retourner une réponse
    } catch (error) {
      console.error("Error in search route:", error);
      return res.status(500).json({ error: "An error occurred" });  // Assurer un statut 500 pour les erreurs
    }
  })
);



module.exports = backend;
