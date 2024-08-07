const Sequelize = require("sequelize");

module.exports = (sequelize, Users, ProfileIcon) => {
  class ProfileUser extends Sequelize.Model {
    static associate(models) {
      ProfileUser.belongsTo(models.Users, { foreignKey: "userId" });
      ProfileUser.belongsTo(models.ProfileIcon, {
        foreignKey: "profileIconId",
      });
    }
  }
  ProfileUser.init(
    {
      idProfileUser: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      profileName: Sequelize.STRING,
      profileMain: Sequelize.BOOLEAN,
      ageRestriction: Sequelize.BOOLEAN,
      password: Sequelize.STRING,
      profileIconId: {
        type: Sequelize.INTEGER,
        references: {
          model: ProfileIcon, // Nom du modèle lié
          key: "idProfileIcon", // Clé primaire du modèle lié
        },
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: Users, // Nom du modèle lié
          key: "id", // Clé primaire du modèle lié
        },
      },
    },
    { sequelize, modelName: "ProfileUser" }
  );

  return ProfileUser;
};
