const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Deal title is required"],
      trim: true,
    },
    lead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
      required: true,
    },
    value: {
      type: Number,
      default: 0,
    },
    stage: {
      type: String,
      enum: ["Prospecting", "Proposal", "Negotiation", "Closed Won", "Closed Lost"],
      default: "Prospecting",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    closeDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Deal", dealSchema);
