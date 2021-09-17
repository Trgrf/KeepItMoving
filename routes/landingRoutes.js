const router = require("express").Router();
const { User, Exercise } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const exerciseData = await Exercise.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
    const exercises = exerciseData.map((exercise) => exercise.get({ plain: true }));

    res.render("landingpage", {
      exercises,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/exercise/:id", async (req, res) => {
  try {
    const exerciseData = await Exercise.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
    const exercise = exerciseData.get({ plain: true });

    res.render("exercise", {
      ...exercise,
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
      include: [{ model: Exercise }],
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
