const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connectDB");

connectDB();
const app = express();

const corsOptions = {
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/v1/users", require("./routes/userRoute"));
app.use("/api/v1/movies", require("./routes/movieRoute"));
app.use("/api/v1/shows", require("./routes/showRoute"));
app.use("/api/v1/theaters", require("./routes/theatreRoute"));
app.use("/api/v1/bookings", require("./routes/bookingRoute"));
app.use("/api/v1/payment", require("./routes/stripeRoute"));

const PORT = 8080;

app.listen(PORT, () => {
  console.log("Server Started");
});
