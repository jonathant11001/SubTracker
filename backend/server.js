require("dotenv").config();

const API_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT;

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const subscriptionRoutes = require("./routes/subscriptions");
const usersRouter = require("./routes/users");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4173",
  "http://localhost:10000",
  "https://subtrackerfrontend.onrender.com",
];

// Middleware
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/users", usersRouter);

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(API_URL);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
connectDB()
app.listen(PORT,'0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
