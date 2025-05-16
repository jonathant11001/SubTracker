const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subscriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subscription" }],
  monthlySpendings: [{ type: mongoose.Schema.Types.ObjectId, ref: "MonthlySpending" }],
});

module.exports = mongoose.model("User", userSchema);