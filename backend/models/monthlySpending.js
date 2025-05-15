const mongoose = require("mongoose");

const monthlySpendingSchema = new mongoose.Schema({
  month: { type: String, required: true },
  totalSpending: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("MonthlySpending", monthlySpendingSchema);