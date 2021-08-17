const router = require("express").Router();
const Workout = require("../models/Workout.js");

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