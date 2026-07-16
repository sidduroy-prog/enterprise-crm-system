const express = require("express");
const Deal = require("../models/Deal");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// @route   GET /api/deals
router.get("/", protect, async (req, res) => {
  try {
    const filter = req.user.role === "admin" ? {} : { owner: req.user._id };
    const deals = await Deal.find(filter)
      .populate("lead", "name company status")
      .populate("owner", "name email")
      .sort({ createdAt: -1 });
    res.json(deals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/deals
router.post("/", protect, async (req, res) => {
  try {
    const deal = await Deal.create({ ...req.body, owner: req.body.owner || req.user._id });
    res.status(201).json(deal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/deals/:id
// @desc    Update deal stage (drag-drop pipeline movement) or details
router.put("/:id", protect, async (req, res) => {
  try {
    const deal = await Deal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!deal) return res.status(404).json({ message: "Deal not found" });
    res.json(deal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/deals/:id
router.delete("/:id", protect, authorize("admin"), async (req, res) => {
  try {
    const deal = await Deal.findByIdAndDelete(req.params.id);
    if (!deal) return res.status(404).json({ message: "Deal not found" });
    res.json({ message: "Deal deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
