const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
  theater: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Theater',
    required: true,
  },
  showTime: {
    type: Date, // Store as a Date
    required: true,
  },
  // Add more show-related fields here
});

// Virtual property to extract the time part from the Date
showSchema.virtual('showTimeFormatted').get(function () {
  return this.showTime.toTimeString().slice(0, 5); // HH:mm format
});

const Show = mongoose.model('Show', showSchema);

module.exports = Show;
