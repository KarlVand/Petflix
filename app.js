const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const sqlite3 = require("sqlite3").verbose();

//creation database :
const {
  sequelize,
  Users,
  ProfileUser,
  ProfileIcon,
  Movies,
  videos,
} = require("./models");

(async () => {
  try {
    await sequelize.sync({ force: true }); // force true  = reset db a chaque lancement
    const userTemporaire = require("./JSONData/userTemp.json");
    for (const object of userTemporaire) {
      await Users.create(object);
    }

    const iconTemporaire = require("./JSONData/iconTemp.json");
    for (const object of iconTemporaire) {
      await ProfileIcon.create(object);
    }

    const userProfileTemp = require("./JSONData/userProfileTemp.json");
    for (const object of userProfileTemp) {
      await ProfileUser.create(object);
    }

    const moviesTemp = require("./JSONData/moviesTemp.json");
    for (const object of moviesTemp) {
      await Movies.create(object);
    }
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
})();

//debut de l'APP

const app = express();
app.use(
  session({
    secret: "iciChaineCharacteresCryptage", // a changer régulierement
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: "strict",
      secure: false, //http vs https
      maxAge: 60 * 60 * 1000, //ici a modifier par ça , la durée de la session est de 1 H
    },
  })
);

//app.use((req, res, next) => {
//console.log(req.session);
//}); // voir session creation

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
//app.use(cookieParser());
app.use(express.static("public")); // pour les images , fichiers static

app.set("view engine", "pug");
app.set('views', './views');

//les pages dans le dossier routes

const homeRoutes = require('./routes/homeRoutes');
app.use('/', homeRoutes);

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

const search = require("./routes/search");
app.use(search);
// //error traitement

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
  const status = err.status || 500;
  res.status(status);
  res.render("error");
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
