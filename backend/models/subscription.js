const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  renewalDate: { type: Date, required: true },
  category: { type: String, required: true },
});

module.exports = mongoose.model("Subscription", subscriptionSchema);