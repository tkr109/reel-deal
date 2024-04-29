const express = require("express");
const router = express.Router();
const {
  createBooking,
  getUserBookings,
  getUserBookingSummary,
} = require("../controller/bookingController");

router.post("/add-bookings", createBooking);

router.get("/users/bookings/:id", getUserBookings);

router.get('/user-booking-summary', getUserBookingSummary);


module.exports = router;
