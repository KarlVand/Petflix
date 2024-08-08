const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  class FavMovies extends Sequelize.Model {}
  FavMovies.init(
    {
      idFavMovies: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      favMovie: Sequelize.BOOLEAN,
      backdrop_path: Sequelize.STRING,
      pageLink: Sequelize.STRING,
      idDbMovie: Sequelize.INTEGER,
    },
    { sequelize }
  );

  return FavMovies;
};
