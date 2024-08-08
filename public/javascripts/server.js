const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const app = express();
const port = 3000;

// Se connecter a la db
const db = new sqlite3.Database("./movies.db");
const db2 = new sqlite3.Database("./movies2.db");


// Servir les fichiers statiques comme : HTML, CSS, JS
app.use(express.static(path.join(__dirname, "public")));

// Configuration du endpoint pour obtenir les films
app.get("/api/movies", (req, res) => {
  db.all("SELECT * FROM movies", [], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});