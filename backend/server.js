require("dotenv").config();

const API_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 5000;

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const subscriptionRoutes = require("./routes/subscriptions");
const usersRouter = require("./routes/users");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/users", usersRouter);

// Connect to MongoDB
mongoose
  .connect(API_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((error) => console.error("Error connecting to MongoDB:", error.message));
