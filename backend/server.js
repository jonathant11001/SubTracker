const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const subscriptionRoutes = require("./routes/subscriptions");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/subscriptions", subscriptionRoutes);

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/subtracker", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((error) => console.error("Error connecting to MongoDB:", error.message));
