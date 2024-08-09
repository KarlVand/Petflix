const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  class Users extends Sequelize.Model {
    static associate(models) {
      Users.hasMany(models.ProfileUser, { foreignKey: "userId" });
    }
  }
  Users.init(
    {
      username: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.STRING,
      newsletter: Sequelize.BOOLEAN,
    },
    { sequelize, modelName: "Users" }
  );

  return Users;
};
