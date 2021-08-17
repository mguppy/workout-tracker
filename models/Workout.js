const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: new Date(new Date().setDate(new Date().getDate()))
    },
    exercises: [{
    type: {
        type: String,
        trim: true,
        required: "Enter a type for an exercise"
        },
    name: {
        type: String,
        trim: true,
        required: "Enter a name for an exercise"
    },
    duration: {
        type: Number,
    },
    weight: {
        type: Number,
    },
    reps: {
        type: Number,
    },
    sets: {
        type: Number,
    },
    distance: {
        type: Number,
    }
    }]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;