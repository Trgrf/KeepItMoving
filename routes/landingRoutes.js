const router = require("express").Router();
const {User, Workout, Exercise} = require("../models");
const Auth = require("../utils/auth")