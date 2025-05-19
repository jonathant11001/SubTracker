require("dotenv").config();

const API_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 10000;

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const subscriptionRoutes = require("./routes/subscriptions");
const usersRouter = require("./routes/users");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4173",
  "https://your-production-frontend.com",
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
mongoose
  .connect(API_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, '0.0.0.0', () => console.log(`Server is running on http://0.0.0.0:${PORT}`));
  })
  .catch((error) => console.error("Error connecting to MongoDB:", error.message));
