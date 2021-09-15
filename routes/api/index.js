const router = require("express").Router();
const exerciseRoutes = require("./exerciseRoutes");
const userRoutes = require("./userRoutes");
const workoutRoutes = require("./workoutRoutes");

router.use("/exercise", exerciseRoutes);
router.use("/user", userRoutes);
router.use("/workout", workoutRoutes);

module.exports = router;

