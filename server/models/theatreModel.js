const mongoose = require('mongoose');

const theaterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  // Reference to the Movie model to represent the movies playing in each theater
  movies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie',
    },
  ],
  timings: [
    {
      type: [String],
      enum: ['morning', 'afternoon', 'evening', 'night', 'late night'],
    },
  ],
});

const Theater = mongoose.model('Theater', theaterSchema);

module.exports = Theater;
