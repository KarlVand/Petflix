const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const Sequelize = require("sequelize");

//creation database :

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "development.db",
  //logging: false // disable logging
});

//connection db ;

const dbTable = requirerequire("./models").Sequelize(
  // async IIFE fonction qui ce lance lorsque l on run l app ne pas oublier les ()
  async () => {
    try {
      await sequelize.authenticate();
      await dbTable.sync(/*{force: true}*/); //pour reset la db a chaque fois
      console.log("Connection to the database successful!");
    } catch (error) {
      console.error("Error connecting to the database: ", error);
    }
  }
)();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public")); // pour les images , fichiers static

app.set("view engine", "pug");

//les pages dans le dossier routes

const routes = require("./routes/index");
app.use(routes);

//error traitement

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render("error");
});

app.listen(3000, () => {
  console.log("server on");
});
