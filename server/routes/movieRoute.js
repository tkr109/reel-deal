const express = require("express");
const { createMovie, getMovies, deleteMovie, getMovieById } = require('../controller/movieController'); 

const router = express.Router();

// POST || CREATE MOVIE
router.post("/add-movies", createMovie);

// GET || FETCH ALL MOVIES
router.get("/get-movies", getMovies);

// Delete a movie by ID
router.delete('/delete-movie/:id', deleteMovie);

// GET || FETCH MOVIE BY ID
router.get('/get-movie/:id', getMovieById);

module.exports = router;
