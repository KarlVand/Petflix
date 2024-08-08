const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  class Movies extends Sequelize.Model {}
  Movies.init(
    {
      idMovies: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      adult: Sequelize.BOOLEAN,
      backdrop_path: Sequelize.STRING,
      genre_ids: Sequelize.STRING,
      original_language: Sequelize.STRING,
      original_title: Sequelize.STRING,
      overview: Sequelize.STRING,
      poster_path: Sequelize.STRING,
      release_date: Sequelize.STRING,
      title: Sequelize.STRING,
      popularity: Sequelize.FLOAT,
      vote_average: Sequelize.FLOAT,
      vote_count: Sequelize.FLOAT,
    },
    { sequelize }
  );

  return Movies;
};
