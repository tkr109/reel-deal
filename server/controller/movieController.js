const Movie = require('../models/movieModel');

const createMovie = async (req, res) => {
  try {
    const {
      id,
      poster_path,
      vote_average,
      genre_ids,
      title,
      release_date,
      media_type,
      trailer_link,
      director,
      runtime,
    } = req.body;

    const newMovie = new Movie({
      id,
      poster_path,
      vote_average,
      genre_ids,
      title,
      release_date,
      media_type,
      trailer_link, // Add the new fields to the movie document
      director,
      runtime,
    });

    await newMovie.save();

    res.status(201).json({
      success: true,
      movie: newMovie,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getMoviesSorted = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ release_date: 1 });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


const getMovieById = async (req, res) => {
  try {
    const movieId = req.params.id; 
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movieId = req.params.id; 
    const deletedMovie = await Movie.findByIdAndDelete(movieId);

    if (!deletedMovie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    res.json({ success: true, message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createMovie,
  getMovies,
  getMovieById,
  deleteMovie,
  getMoviesSorted
};
