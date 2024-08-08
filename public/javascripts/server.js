const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const app = express();
const port = 3000;
const pathObj = require("path");
const url = require("url");
const { fileURLToPath } = require("url");
const meta = require("url");
const selectedFile = fileURLToPath(import.meta.url);
const directoryPath = pathObj.dirname(selectedFile);

// Conectar a la base de datos db1
const db = new sqlite3.Database("./movies.db");
// Conectar a la base de datos db2
const db2 = new sqlite3.Database("./db2.db");

// Servir archivos CSS y JS desde el directorio 'public'
app.use("/stylesheets", express.static(path.join(__dirname, "../stylesheets")));
app.use("/javascript", express.static(path.join(__dirname, "../javascript")));

// Servir el archivo HTML desde el directorio 'html'
app.get("/", (req, res) => {
  res.sendFile("frontEnd.html", { root: directoryPath });
});

// Endpoint para obtener películas de db1
app.get("/api/movies", (req, res) => {
  db.all("SELECT * FROM movies", [], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.json(rows);
  });
});

// Endpoint para obtener películas de db2
app.get("/api/movies2", (req, res) => {
  db2.all("SELECT * FROM movies", [], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
      ("");
    }
    res.json(rows);
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
