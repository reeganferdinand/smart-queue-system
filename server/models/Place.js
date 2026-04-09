const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["hotel", "bank", "hospital"],
      default: "hotel",
    }
  },
  { timestamps: true }
);

// ✅ Add UNIQUE COMBINATION
placeSchema.index({ name: 1, location: 1 }, { unique: true });

module.exports = mongoose.model("Place", placeSchema);