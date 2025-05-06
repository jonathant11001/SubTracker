const express = require("express");
const router = express.Router();
const Subscription = require("../models/subscription");

// Add a subscription
router.post("/", async (req, res) => {
  try {
    const subscription = new Subscription(req.body);
    await subscription.save();
    res.status(201).send(subscription);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Get all subscriptions
router.get("/", async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.send(subscriptions);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  await Subscription.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

router.put('/:id', async (req, res) => {
  const updated = await Subscription.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

module.exports = router;