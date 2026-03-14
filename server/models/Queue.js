const mongoose = require("mongoose");

const queueSchema = new mongoose.Schema(
  {
    placeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    currentNumber: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Queue", queueSchema);