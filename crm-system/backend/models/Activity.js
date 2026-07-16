const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    lead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
      required: true,
    },
    type: {
      type: String,
      enum: ["Note", "Call", "Email", "Meeting"],
      default: "Note",
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);
