const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    queueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Queue",
      required: true,
    },
    ticketNumber: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      status: ["waiting", "served"],
      default: "waiting",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", ticketSchema);
