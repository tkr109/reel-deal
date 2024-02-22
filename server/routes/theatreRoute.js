const express = require('express');
const router = express.Router();
const {
  createTheater,
  getTheaters,
  deleteTheater,
  addMovieToTheatre,
  getTheatersForMovie,
  editTheater // Import the new function
} = require('../controller/theatreController');

// Create a new theater
router.post('/add-theater', createTheater);

// Get all theaters
router.get('/get-theaters', getTheaters);

// Delete a theater by ID
router.delete('/delete-theater/:id', deleteTheater);

// Add a movie to a theater 
router.post('/add-movie-to-theater/:theaterId', addMovieToTheatre);

// Retrieve theaters associated with a specific movie
router.get('/get-theaters-for-movie/:movieId', getTheatersForMovie);

// Edit a theater by ID
router.put('/edit-theater/:theaterId', editTheater);

module.exports = router;
 