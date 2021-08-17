const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        defualt: new Date(new Date().setDate(new Date().getDate()))
    },
    exercises: [{
    type: {
        type: String,
        trim: true,
        required: "Enter a name for transaction"
        },
    name: {
        type: String,
        trim: true,
        required: "Enter a name for transaction"
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
    }
    }]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;