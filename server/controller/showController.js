const Show = require('../models/showModel');

// Create a new show
const createShow = async (req, res) => {
  try {
    const { title, poster_path, release_date, vote_average, genre_ids, overview, media_type, trailer_link, director, runtime,city } = req.body;

    const newShow = new Show({
      title,
      poster_path,
      release_date,
      overview,
      media_type,
      director,
      runtime,
      vote_average,
      city
    });

    await newShow.save();

    res.status(201).json({
      success: true,
      show: newShow,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

// Get all shows
const getShows = async (req, res) => {
  try {
    const shows = await Show.find();
    res.json(shows);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a show by ID
const deleteShow = async (req, res) => {
  try {
    const showId = req.params.id; // Assuming you pass the show ID in the URL
    const deletedShow = await Show.findByIdAndDelete(showId);

    if (!deletedShow) {
      return res.status(404).json({ error: 'Show not found' });
    }

    res.json({ success: true, message: 'Show deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getShowById = async (req, res) => {
  try {
    const showId = req.params.id;
    const show = await Show.findById(showId);

    if (!show) {
      return res.status(404).json({ error: 'Show not found' });
    }

    res.json(show);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


module.exports = {
  createShow,
  getShows,
  deleteShow,
  getShowById
};
