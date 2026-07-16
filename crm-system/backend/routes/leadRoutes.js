const express = require("express");
const Lead = require("../models/Lead");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// @route   GET /api/leads
// @desc    Get all leads (sales_rep sees only their own, admin sees all)
router.get("/", protect, async (req, res) => {
  try {
    const filter = req.user.role === "admin" ? {} : { assignedTo: req.user._id };
    const leads = await Lead.find(filter)
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/leads/:id
router.get("/:id", protect, async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id).populate("assignedTo createdBy", "name email");
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/leads
// @desc    Create a new lead
router.post("/", protect, async (req, res) => {
  try {
    const lead = await Lead.create({
      ...req.body,
      createdBy: req.user._id,
      assignedTo: req.body.assignedTo || req.user._id,
    });
    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/leads/:id
// @desc    Update lead (status, details, reassignment)
router.put("/:id", protect, async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/leads/:id
// @desc    Delete a lead (admin only)
router.delete("/:id", protect, authorize("admin"), async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json({ message: "Lead deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
