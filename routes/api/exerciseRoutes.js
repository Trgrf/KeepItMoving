const router = require("express").Router();
const { Exercise, User } = require("../../models");

// get all exercises
router.get("/", async (req, res) => {
  console.log("/api/exercise");
  try {
    const exerciseData = await Exercise.findAll();
    res.status(200).json(exerciseData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get single exercise
router.get("/:id", async (req, res) => {
  console.log("/api/exercise/:id");
  try {
    const exerciseData = await Exercise.findByPk(req.params.id, {
      include: [{ model: User}],
    });

    if (!exerciseData) {
      res.status(404).json({ message: "No exercise found!" });
      return;
    }
    res.status(200).json(exerciseData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// add new exercise
router.post("/", async (req, res) => {
  try {
    console.log("createExercise");
    const exerciseData = await Exercise.create(req.body);
    res.status(200).json(exerciseData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//delete exercise from view
router.delete("/:id", async (req, res) => {
  try {
    const exerciseData = await Exercise.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!exerciseData) {
      res.status(404).json({message: "No exercise found with this id!"});
      return;
    }
    res.status(200).json(exerciseData);
  }  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
