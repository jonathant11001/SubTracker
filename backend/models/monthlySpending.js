const mongoose = require("mongoose");

const monthlySpendingSchema = new mongoose.Schema({
  month: { type: String, required: true },
  totalSpending: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("MonthlySpending", monthlySpendingSchema);