const router = require("express").Router();
const Workout = require("../models/Workout.js");

// Get last workout with total duration summed
router.get("/api/workouts", (req, res, next) => {
    Workout.aggregate([
        {
        $addFields: {
            totalDuration: {
                $sum: '$exercises.duration',
            },
        },
    },
])
    .then((dbWorkout) => {
        res.json(dbWorkout);
    })
    .catch((err) => {
        res.json(err);
    });
});

// Add exercise to most recent workout plan
router.put("/api/workouts/:id", ({body, params}, res) => {
    Workout.findByIdAndUpdate(
        params.id,
        {$push: {exercises: body}},
        {new: true, runValidators: true}
    )
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
});

// Add new exercises to a new workout plan
router.post("/api/workouts", (req, res) => {
    Workout.create({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
});

// Last seven workouts added to stats page sorted by total duration
router.get("/api/workouts/range", (req, res, next) => {
    Workout.aggregate([
        {
        $addFields: {
            totalDuration: {
                $sum: '$exercises.duration',
            },
        },
    },
])
    .sort({_id: -1})
    .limit(7)
    .then((dbWorkout) => {
        res.json(dbWorkout);
    })
    .catch((err) => {
        res.json(err);
    });
});


// Adds all weights together from past seven workouts; goes onto the stats
router.get("/api/workouts/range", (req, res, next) => {
    Workout.aggregate([
        {
        $addFields: {
            totalWeight: {
                $sum: '$exercises.weight',
            },
        },
    },
])
    .sort({_id: -1})
    .limit(7)
    .then((dbWorkout) => {
        res.json(dbWorkout);
    })
    .catch((err) => {
        res.json(err);
    });
});

module.exports = router;