const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ["hotel", "bank", "hospital"],
    default: "hotel"
  },
  location: {
    type: String,
    required: true
  }
},
{ timestamps: true }
);

module.exports = mongoose.model("Place", placeSchema);