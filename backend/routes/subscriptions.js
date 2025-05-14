const express = require("express");
const router = express.Router();
const Subscription = require("../models/subscription");


router.post("/", async (req, res) => {
  try {
    const { name, price, startDate, category, typeOfSubscription, notification } = req.body;

    if (!name || !price || !startDate || !category || !typeOfSubscription) {
      return res.status(400).send({ error: "All fields are required." });
    }

    const validStartDate = new Date(startDate);
    if (isNaN(validStartDate)) {
      return res.status(400).send({ error: "Invalid startDate provided." });
    }
    if (validStartDate > new Date()) {
      return res.status(400).send({ error: "startDate cannot be in the future." });
    }

    const currentDate = new Date();
    let previousRenewDate = new Date(validStartDate);
    let renewalDate = new Date(validStartDate);

    if (typeOfSubscription === "Monthly") {
      while (renewalDate <= currentDate) {
        previousRenewDate = new Date(renewalDate);
        renewalDate.setMonth(renewalDate.getMonth() + 1);
      }
    } else if (typeOfSubscription === "Yearly") {
      while (renewalDate <= currentDate) {
        previousRenewDate = new Date(renewalDate);
        renewalDate.setFullYear(renewalDate.getFullYear() + 1);
      }
    } else {
      return res.status(400).send({ error: "Invalid typeOfSubscription provided." });
    }

    const subscription = new Subscription({
      name,
      price,
      startDate: validStartDate,
      previousRenewDate,
      renewalDate,
      category,
      typeOfSubscription,
      notification,
    });

    await subscription.save();
    res.status(201).send(subscription);
  } catch (error) {
    console.error("Error creating subscription:", error.message);
    res.status(500).send({ error: error.message });
  }
});


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

router.put("/:id", async (req, res) => {
  try {
    const { typeOfSubscription, startDate } = req.body;

    let validStartDate = startDate ? new Date(startDate) : new Date();
    if (isNaN(validStartDate)) {
      return res.status(400).send({ error: "Invalid startDate provided." });
    }
    if (validStartDate > new Date()) {
      return res.status(400).send({ error: "startDate cannot be in the future." });
    }
    
    let renewalDate = new Date(startDate || Date.now());
    if (typeOfSubscription === "Monthly") {
      renewalDate.setMonth(renewalDate.getMonth() + 1);
    } else if (typeOfSubscription === "Yearly") {
      renewalDate.setFullYear(renewalDate.getFullYear() + 1);
    }

    const updated = await Subscription.findByIdAndUpdate(
      req.params.id,
      { ...req.body, renewalDate },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get("/monthly-spending", async (req, res) => {
  try {
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

    const subscriptions = await Subscription.find({
      renewalDate: { $gte: startOfMonth, $lte: endOfMonth },
    });

    const totalSpending = subscriptions.reduce((sum, sub) => sum + sub.price, 0);
    res.json({ totalSpending });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/yearly-projection", async (req, res) => {
  try {
    const subscriptions = await Subscription.find();

    const yearlyProjection = subscriptions.reduce((sum, sub) => {
      if (sub.typeOfSubscription === "Monthly") {
        return sum + sub.price * 12;
      } else if (sub.typeOfSubscription === "Yearly") {
        return sum + sub.price;
      }
      return sum;
    }, 0);

    res.json({ yearlyProjection });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/limit-set", async (req, res) => {
  try {
    const limitSet = 500;
    res.json({ limitSet });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/highest-subscription", async (req, res) => {
  try {
    const highestSubscription = await Subscription.findOne().sort({ price: -1 }).limit(1);

    if (!highestSubscription) {
      return res.json({ highestSubscription: { name: "N/A", price: 0 } });
    }

    res.json({ highestSubscription });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post("/update-renewals", async (req, res) => {
  try {
    console.log("Updating subscription renewals...");

    const subscriptions = await Subscription.find();

    for (const sub of subscriptions) {
      let startDate = sub.startDate ? new Date(sub.startDate) : null;
      if (!startDate || isNaN(startDate)) {
        console.warn(`Invalid startDate for subscription ID: ${sub._id}`);
        continue;
      }

      const currentDate = new Date();
      let latestRenewalDate = new Date(startDate);
      let nextRenewalDate = new Date(startDate);

      if (sub.typeOfSubscription === "Monthly") {
        while (latestRenewalDate <= currentDate) {
          latestRenewalDate.setMonth(latestRenewalDate.getMonth() + 1);
        }
        nextRenewalDate = new Date(latestRenewalDate);
        latestRenewalDate.setMonth(latestRenewalDate.getMonth() - 1);
      } else if (sub.typeOfSubscription === "Yearly") {
        while (latestRenewalDate <= currentDate) {
          latestRenewalDate.setFullYear(latestRenewalDate.getFullYear() + 1);
        }
        nextRenewalDate = new Date(latestRenewalDate);
        latestRenewalDate.setFullYear(latestRenewalDate.getFullYear() - 1);
      }

      await Subscription.findByIdAndUpdate(sub._id, {
        previousRenewalDate: latestRenewalDate,
        renewalDate: nextRenewalDate,
      });

    }

    console.log("Renewals updated successfully.");
    res.json({ success: true, message: "Renewals updated successfully." });
  } catch (error) {
    console.error("Error updating renewals:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;