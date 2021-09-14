const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connections");

// create a workout model
class Workout extends Model {}

Workout.init({
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
  day: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  sets: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  reps: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  session_length: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
},
{
    sequelize,
    timestamp: false,
    freezeTableName: true,
    underscored: true,
    modelName: "workout"
}
);

module.exports = Workout;
