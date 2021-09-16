const router = require("express").Router();
const { Workout } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
    console.log("/api/workout");
    try {
      const workOutData = await Workout.findAll();
      res.status(200).json(workOutData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.get("/:id", async (req, res) => {
    console.log("/api/workout/:id");
    try {
      const workOutData = await Workout.findByPk(req.params.id);
  
      if (!workOutData) {
        res.status(404).json({ message: "No workout found!" });
        return;
      }
      res.status(200).json(workOutData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.post('/', withAuth, async (req, res) => {
    try {
        const newWorkout = await Workout.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newWorkout);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const workoutData = await Workout.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!workoutData) {
            res.status(400).json({ message: 'No workout found with this id!' });
            return;
        }

        res.status(200).json(workoutData);
    } catch (err) { 
        res.status(500).json(err);
    }
});

module.exports = router;