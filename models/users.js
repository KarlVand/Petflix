const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  class Users extends Sequelize.Model {}
  Users.init(
    {
      username: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.STRING,
    },
    { sequelize }
  );

  return Users;
};
