const User = require("./User");
const Workout = require("./Workout");
const Exercise = require("./Exercise");

User.hasMany(Workout, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Workout.belongsTo(User, {
  foreignKey: "user_id",
});
// Workout.hasMany(Exercise, {
//   foreignKey: "workout_id",
//   onDelete: "CASCADE",
// });
Exercise.belongsToMany(User, {
  through: {
    model: Workout,
    unique: false,
  },
  //define an alias for data retrieved
  as: "exercise_user"
});

module.exports = { User, Workout, Exercise };
