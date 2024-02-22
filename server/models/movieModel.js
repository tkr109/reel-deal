const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  poster_path: {
    type: String,
    required: true,
  },
  vote_average: {
    type: Number,
    required: true,
  },
  genre_ids: {
    type: [Number],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  release_date: {
    type: Date,
    required: true,
  },
  media_type: {
    type: String,
    required: true,
  },
  trailer_link: {
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
  }
}, { timestamps: true });

const Movie = mongoose.model("film", movieSchema);

module.exports = Movie;
