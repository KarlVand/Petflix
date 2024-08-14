const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("node:fs");

// Crear la conexión a SQLite
const db = new sqlite3.Database("./movies.db");

// Inicializar Express
const app = express();

// Configurar puerto
const PORT = 3000;

// Configuración de sesiones
app.use(
  session({
    secret: "iciChaineCharacteresCryptage",
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: "strict",
      secure: false,
      maxAge: 60 * 60 * 1000, // 1 hora de duración de la sesión
    },
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public")); // Archivos estáticos

// Configuración de Pug como motor de plantillas
app.set("view engine", "pug");

// Sincronización de la base de datos Sequelize
const { sequelize, Users, ProfileUser, ProfileIcon } = require("./models");

(async () => {
  try {
    await sequelize.sync({ force: true });
    const userTemporaire = require("./PrototypeTestDivers/userTemp.json");
    for (const object of userTemporaire) {
      await Users.create(object);
    }

    const iconTemporaire = require("./PrototypeTestDivers/iconTemp.json");
    for (const object of iconTemporaire) {
      await ProfileIcon.create(object);
    }

    const userProfileTemp = require("./PrototypeTestDivers/userProfileTemp.json");
    for (const object of userProfileTemp) {
      await ProfileUser.create(object);
    }

    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
})();

// Rutas y middleware de rutas existentes
const routes = require("./routes/index");
app.use(routes);

const backend = require("./routes/backend");
app.use(backend);

const testing = require("./routes/test");
app.use(testing);

const check = require("./routes/check");
app.use(check);

const profile = require("./routes/profile");
app.use(profile);

// Nueva ruta para servir allmovies.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "allmovies.html"));
});

// Endpoint para obtener las películas con videos asociados desde SQLite
app.get("/api/movies", (req, res) => {
  db.all(
    `
    SELECT movies.*, GROUP_CONCAT(
      json_object(
        'id', videos.id, 
        'name', videos.name, 
        'key', videos.key, 
        'site', videos.site, 
        'size', videos.size, 
        'type', videos.type, 
        'official', videos.official, 
        'published_at', videos.published_at
      )
    ) AS videos
    FROM movies
    LEFT JOIN videos ON movies.id = videos.movie_id
    GROUP BY movies.id`,
    [],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      rows.forEach((row) => {
        row.videos = JSON.parse(`[${row.videos}]`);
      });

      res.json({ movies: rows });
    }
  );
});

// Manejo de errores 404
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Manejo de otros errores
app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status || 500);
  res.render("error");
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
