const express = require("express");
const Activity = require("../models/Activity");
const { protect } = require("../middleware/auth");

const router = express.Router();

// @route   GET /api/activities/:leadId
// @desc    Get all activity logs for a specific lead
router.get("/:leadId", protect, async (req, res) => {
  try {
    const activities = await Activity.find({ lead: req.params.leadId })
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/activities
// @desc    Add a new activity/note to a lead
router.post("/", protect, async (req, res) => {
  try {
    const activity = await Activity.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
