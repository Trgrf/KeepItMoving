const router = require("express").Router();
const { User, Workout, Exercise } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const workoutData = await Workout.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
    const workouts = workoutData.map((workout) => workout.get({ plain: true }));

    res.render("landingpage", {
      workouts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/workout/:id", async (req, res) => {
  try {
    const workoutData = await Workout.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
    const workout = workoutData.get({ plain: true });

    res.render("workout", {
      ...workout,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/profile", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPK(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Workout }],
    });

    const user = userData.get({ plain: true });

    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }
  res.render("login");
});

module.exports = router;
