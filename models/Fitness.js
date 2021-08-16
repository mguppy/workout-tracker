const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FitnessSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  workouts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Workout"
    }
  ]
});

const Fitness = mongoose.model("Fitness", FitnessSchema);

module.exports = Fitness;