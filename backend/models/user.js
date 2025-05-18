const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subscriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subscription" }],
  monthlySpendings: [{ type: mongoose.Schema.Types.ObjectId, ref: "MonthlySpending" }],
  limit: { type: Number, default: 500 },
  backgroundColor: {
    type: String,
    default: "linear-gradient(135deg, #0D0D0D 0%, #101820 50%, #30E0C6 100%)"
  },
  componentColor: {
    type: String,
    default: "23272A"
  }
});

module.exports = mongoose.model("User", userSchema);