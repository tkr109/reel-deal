const mongoose = require("mongoose");

const showSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  poster_path: {
    type: String,
    required: true,
  },
  release_date: {
    type: Date,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  media_type: {
    type: String,
    required: true,
  },
  director: {
    type: String, 
    required: true,
  },
  runtime: {
    type: Number, 
    required: true,
  },
  vote_average: {
    type: Number, 
    required: true,
  },
  city: {
    type: String, 
    required: true,
  },
}, { timestamps: true });

const Show = mongoose.model("Show", showSchema);

module.exports = Show;
