const User = require("./User");
// const Workout = require("./Workout");
const Exercise = require("./Exercise");

User.hasMany(Exercise, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// Workout.belongsTo(User, {
//   foreignKey: "user_id",
// });
// Workout.hasMany(Exercise, {
//   foreignKey: "workout_id",
//   onDelete: "CASCADE",
// });
Exercise.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Exercise };
