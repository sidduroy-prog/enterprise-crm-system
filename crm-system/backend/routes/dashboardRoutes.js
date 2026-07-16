const express = require("express");
const Lead = require("../models/Lead");
const Deal = require("../models/Deal");
const { protect } = require("../middleware/auth");

const router = express.Router();

// @route   GET /api/dashboard/stats
// @desc    Get summary stats for dashboard (total leads, conversion rate, stage breakdown)
router.get("/stats", protect, async (req, res) => {
  try {
    const leadFilter = req.user.role === "admin" ? {} : { assignedTo: req.user._id };
    const dealFilter = req.user.role === "admin" ? {} : { owner: req.user._id };

    const totalLeads = await Lead.countDocuments(leadFilter);
    const wonLeads = await Lead.countDocuments({ ...leadFilter, status: "Won" });
    const lostLeads = await Lead.countDocuments({ ...leadFilter, status: "Lost" });

    const leadsByStatus = await Lead.aggregate([
      { $match: leadFilter },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const dealsByStage = await Deal.aggregate([
      { $match: dealFilter },
      { $group: { _id: "$stage", count: { $sum: 1 }, totalValue: { $sum: "$value" } } },
    ]);

    const conversionRate = totalLeads > 0 ? ((wonLeads / totalLeads) * 100).toFixed(1) : 0;

    res.json({
      totalLeads,
      wonLeads,
      lostLeads,
      conversionRate,
      leadsByStatus,
      dealsByStage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
