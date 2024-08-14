"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Videos extends Model {
    static associate(models) {
      // define association here if needed
    }
  }
  Videos.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      key: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      // Add any other fields you need for your videos
    },
    {
      sequelize,
      modelName: "videos",
    }
  );
  return Videos;
};
