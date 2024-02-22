const Theater = require('../models/theatreModel');
const Movie = require('../models/movieModel');

const createTheater = async (req, res) => {
  try {
    const { theaterName, city, capacity, timings } = req.body;
    const name = theaterName;
    const newTheater = new Theater({
      name,
      city,
      capacity,
      timings, // Include timings in the theater document
    });

    await newTheater.save();

    res.status(201).json({
      success: true,
      theater: newTheater,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const getTheaters = async (req, res) => {
  try {
    const theaters = await Theater.find();
    res.json(theaters);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteTheater = async (req, res) => {
  try {
    const theaterId = req.params.id;
    const deletedTheater = await Theater.findByIdAndDelete(theaterId);

    if (!deletedTheater) {
      return res.status(404).json({ error: 'Theater not found' });
    }

    res.json({ success: true, message: 'Theater deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const addMovieToTheatre = async (req, res) => {
  try {
    const { theaterId } = req.params; // Extract the theater ID from the URL
    const { movieId } = req.body; // Extract the movie ID from the request body

    const theater = await Theater.findById(theaterId);

    if (!theater) {
      return res.status(404).json({ error: 'Theater not found' });
    }

    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    // Check if the movie is already associated with the theater
    const isMovieAssociated = theater.movies.some(
      (associatedMovie) => associatedMovie.toString() === movieId
    );

    if (isMovieAssociated) {
      return res.status(400).json({ error: 'Movie is already associated with the theater' });
    }

    // Add the movie to the theater's list of associated movies
    theater.movies.push(movieId);

    await theater.save();

    res.status(200).json({ message: 'Movie added to the theater successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getTheatersForMovie = async (req, res) => {
  try {
    const { movieId } = req.params;

    // Find the movie by its ID
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    // Find theaters associated with the movie
    const theaters = await Theater.find({ movies: movieId });

    res.json(theaters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const editTheater = async (req, res) => {
  try {
    const { theaterId } = req.params; // Extract the theater ID from the URL
    const { theaterName, city, capacity, timings } = req.body;

    const theater = await Theater.findById(theaterId);

    if (!theater) {
      return res.status(404).json({ error: 'Theater not found' });
    }

    theater.name = theaterName;
    theater.city = city;
    theater.capacity = capacity;
    theater.timings = timings;

    await theater.save();

    res.status(200).json({ message: 'Theater updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
  createTheater,
  getTheaters,
  deleteTheater,
  addMovieToTheatre,
  getTheatersForMovie,
  editTheater
};
