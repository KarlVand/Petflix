const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  class Article extends Sequelize.Model {}
  Article.init(
    {
      title: Sequelize.STRING,
      author: Sequelize.STRING,
      body: Sequelize.TEXT,
    },
    { sequelize }
  );

  return Article;
}; // same as { sequelize: sequelize }

// DATE data type accepts a date value provided in yyyy-mm-dd hh:mm:ss format,
// while DATEONLY accepts a date value in yyyy-mm-dd format (DATE without time)
