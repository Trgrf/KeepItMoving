const sequelize = require("../config/connections");
const { User, Exercise } = require("../models");

const userSeedData = require("./userData.json");
// const workoutSeedData = require("./workoutData.json");
const exerciseSeedData = require("./exerciseData.json");

const fitnessDatabase = async () => {
  await sequelize.sync({ force: true });

  const user = await User.bulkCreate(userSeedData, {
    individualHooks: true,
    returning: true,
  });
  


  const exercise = await Exercise.bulkCreate(exerciseSeedData);

  // for (const workout of workoutSeedData) {
  //   await Workout.create({
  //     ...workout,
  //     user_id: user.id,
  //   });
  // }
  process.exit(0);
};

fitnessDatabase();
