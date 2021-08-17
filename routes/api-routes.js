const router = require("express").Router();
const Workout = require("../models/Workout.js");

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

// Delete (find by ID)

// Last seven workouts added to stats page
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


// Adds all durations together; goes onto the stats page
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

module.exports = router;