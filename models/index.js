const User = require('./User');
const Workout = require('./Workout');
const Exercise = require("./Exercise");

User.hasMany(Workout, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Workout.belongsTo(User, {
    foreignKey: 'user_id'
});
Workout.hasMany(Exercise, {
    foreignKey: 'workout_id',
    onDelete: 'CASCADE'
});
Exercise.belongsTo(Workout, {
    foreignKey: 'workout_id'
});

module.exports = {User, Workout, Exercise};