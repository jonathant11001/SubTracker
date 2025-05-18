const express = require("express");
const router = express.Router();
const Subscription = require("../models/subscription");
const MonthlySpending = require("../models/monthlySpending");
const User = require("../models/user");
const auth = require("../middleware/auth");


router.post("/", auth, async (req, res) => {
  try {
    const { name, price, startDate, category, typeOfSubscription} = req.body;

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
    let previousRenewalDate = new Date(validStartDate);
    let renewalDate = new Date(validStartDate);

    if (typeOfSubscription === "Monthly") {
      while (renewalDate <= currentDate) {
        previousRenewalDate = new Date(renewalDate);
        renewalDate.setMonth(renewalDate.getMonth() + 1);
      }
    } else if (typeOfSubscription === "Yearly") {
      while (renewalDate <= currentDate) {
        previousRenewalDate = new Date(renewalDate);
        renewalDate.setFullYear(renewalDate.getFullYear() + 1);
      }
    } else {
      return res.status(400).send({ error: "Invalid typeOfSubscription provided." });
    }

    const subscription = new Subscription({
      name,
      price,
      startDate: validStartDate,
      previousRenewalDate,
      renewalDate,
      category,
      typeOfSubscription,
      user: req.user.userId,
    });

    await subscription.save();

    res.status(201).json(subscription);
  } catch (error) {
    console.error("Error creating subscription:", error.message);
    res.status(500).send({ error: error.message });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ user: req.user.userId });
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const sub = await Subscription.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
    if (!sub) return res.status(404).json({ error: "Subscription not found" });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const { name, price, startDate, category, typeOfSubscription} = req.body;

    if (!name || !price || !startDate || !category || !typeOfSubscription) {
      return res.status(400).send({ error: "All fields are required." });
    }

    const validStartDate = new Date(startDate);
    if (isNaN(validStartDate)) {
      return res.status(400).send({ error: "Invalid startDate provided." });
    }

    const currentDate = new Date();
    let previousRenewalDate = new Date(validStartDate);
    let renewalDate = new Date(validStartDate);

    if (typeOfSubscription === "Monthly") {
      while (renewalDate <= currentDate) {
        previousRenewalDate = new Date(renewalDate);
        renewalDate.setMonth(renewalDate.getMonth() + 1);
      }
    } else if (typeOfSubscription === "Yearly") {
      while (renewalDate <= currentDate) {
        previousRenewalDate = new Date(renewalDate);
        renewalDate.setFullYear(renewalDate.getFullYear() + 1);
      }
    } else {
      return res.status(400).send({ error: "Invalid typeOfSubscription provided." });
    }

    const updated = await Subscription.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      {
        name,
        price,
        startDate: validStartDate,
        category,
        typeOfSubscription,
        previousRenewalDate,
        renewalDate,
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Subscription not found" });

    res.json(updated);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get("/monthly-spending", auth, async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ user: req.user.userId });
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    let totalSpending = 0;

    subscriptions.forEach((sub) => {
      const startDate = new Date(sub.startDate);
      if (isNaN(startDate)) return;

      let previousRenewalDate = new Date(startDate);
      let renewalDate = new Date(startDate);

      if (sub.typeOfSubscription === "Monthly") {
        while (renewalDate <= now) {
          previousRenewalDate = new Date(renewalDate);
          renewalDate.setMonth(renewalDate.getMonth() + 1);
        }
      } else if (sub.typeOfSubscription === "Yearly") {
        while (renewalDate <= now) {
          previousRenewalDate = new Date(renewalDate);
          renewalDate.setFullYear(renewalDate.getFullYear() + 1);
        }
      }

      if (
        (previousRenewalDate >= startOfMonth && previousRenewalDate <= endOfMonth) ||
        (renewalDate >= startOfMonth && renewalDate <= endOfMonth)
      ) {
        totalSpending += sub.price;
      }
    });

    const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    const existingRecord = await MonthlySpending.findOne({ month: monthKey, user: req.user.userId });

    if (!existingRecord) {
      await MonthlySpending.create({ month: monthKey, totalSpending, user: req.user.userId });
    } else {
      existingRecord.totalSpending = totalSpending;
      await existingRecord.save();
    }

    res.json({ totalSpending });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/yearly-projection", auth, async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ user: req.user.userId });

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

router.get("/limit-set", auth, async (req, res) => {
  try {
    const limitSet = 500;
    res.json({ limitSet });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/highest-subscription", auth, async (req, res) => {
  try {
    const highestSubscription = await Subscription.findOne({ user: req.user.userId }).sort({ price: -1 }).limit(1);

    if (!highestSubscription) {
      return res.json({ highestSubscription: { name: "N/A", price: 0 } });
    }

    res.json({ highestSubscription });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post("/update-renewals", auth, async (req, res) => {
  try {
    console.log("Updating subscription renewals...");

    const subscriptions = await Subscription.find({ user: req.user.userId });

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

router.get("/spending-history", auth, async (req, res) => {
  try {
    const now = new Date();
    const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), 1);

    const spendingHistory = await MonthlySpending.find({
      user: req.user.userId,
      month: { $gte: oneYearAgo.toISOString().slice(0, 7) },
    }).sort({ month: 1 });

    res.json(spendingHistory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;