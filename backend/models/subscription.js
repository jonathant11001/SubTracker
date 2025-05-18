const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  startDate: { type: Date, required: true },
  previousRenewalDate: { type: Date, required: true },
  renewalDate: { type: Date, required: true },
  category: { type: String, required: true },
  typeOfSubscription: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Subscription", subscriptionSchema);