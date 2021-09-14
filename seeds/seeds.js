const sequelize = require("../config/connections");
const { User, Workout, Exercise } = require("../models");

const userSeedData = require("./userData.json");
const workoutSeedData = require("./workoutData.json");
const exerciseSeedData = require("./exerciseData.json");
