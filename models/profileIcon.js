const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  class ProfileIcon extends Sequelize.Model {
    static associate(models) {
      ProfileIcon.hasMany(models.ProfileUser, { foreignKey: "profileIconId" });
    }
  }
  ProfileIcon.init(
    {
      idProfileIcon: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      imgName: Sequelize.STRING,
      imgLink: Sequelize.STRING,
    },
    { sequelize }
  );

  return ProfileIcon;
};
