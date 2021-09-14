const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connections");

// create a workout model
class Exercise extends Model {}

Exercise.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  {
    sequelize,
    timestamp: false,
    freezeTableName: true,
    underscored: true,
    modelName: "exercise",
  }
);

module.exports = Exercise;
