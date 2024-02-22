const express = require('express');
const router = express.Router();
const {
    createShow,
    getShows,
    getShowById, // Add this import
    deleteShow,
} = require('../controller/showController');

// Create a new show
router.post('/create-show', createShow);

// Get all shows
router.get('/get-shows', getShows);

// Get a show by ID
router.get('/get-show/:id', getShowById);

// Delete a show by ID
router.delete('/delete-show/:id', deleteShow);

module.exports = router;
