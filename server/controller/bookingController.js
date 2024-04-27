const Booking = require("../models/bookingModel");
const User = require("../models/userModel");

const createBooking = async (req, res) => {
  const { userId, movieName, date, amount } = req.body;


  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newBooking = new Booking({
      user: userId,
      movieName,
      date,
      amount,
    });
    const savedBooking = await newBooking.save();

    user.bookings.push(savedBooking._id);

    await user.save();

    res
      .status(201)
      .json({ message: "Booking created successfully", booking: savedBooking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Failed to create booking" });
  }
};

const getUserBookings = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).populate("bookings");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ bookings: user.bookings });
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ message: "Failed to fetch user bookings" });
  }
};

module.exports = {
  createBooking,
  getUserBookings,
};
