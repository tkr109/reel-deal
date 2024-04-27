const express = require("express");
const router = express.Router();
const {
  createBooking,
  getUserBookings,
} = require("../controller/bookingController");

router.post("/add-bookings", createBooking);

router.get("/users/bookings/:id", getUserBookings);

module.exports = router;
