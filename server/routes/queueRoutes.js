const express = require("express");
const router = express.Router();

const Queue = require("../models/Queue");
const Ticket = require("../models/Ticket");

/**
 * 1️⃣ Create Queue
 */
router.post("/create", async (req, res) => {
  try {
    const { name, placeId } = req.body;

    const queue = new Queue({
      name,
      placeId
    });

    await queue.save();

    res.status(201).json(queue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * 2️⃣ Book Ticket
 */
router.post("/book", async (req, res) => {
  try {
    const { queueId } = req.body;

    const lastTicket = await Ticket.findOne({ queueId }).sort({
      ticketNumber: -1
    });

    const nextNumber = lastTicket ? lastTicket.ticketNumber + 1 : 1;

    const ticket = new Ticket({
      queueId,
      ticketNumber: nextNumber
    });

    await ticket.save();

    res.status(201).json(ticket);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * 3️⃣ Move Queue to Next Ticket
 */
router.post("/next", async (req, res) => {
  try {
    const { queueId } = req.body;

    const queue = await Queue.findById(queueId);
    if (!queue) {
      return res.status(404).json({ message: "Queue not found" });
    }

    const nextTicket = await Ticket.findOne({
      queueId: queue._id,
      ticketNumber: queue.currentNumber + 1
    });

    if (!nextTicket) {
      return res.status(400).json({
        message: "No more tickets in queue"
      });
    }

    queue.currentNumber += 1;
    await queue.save();

    nextTicket.status = "served";
    await nextTicket.save();

    res.json({
      message: "Moved to next ticket",
      currentNumber: queue.currentNumber
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * 4️⃣ Get Queue Status
 */
router.get("/:queueId/status", async (req, res) => {
  try {
    const { queueId } = req.params;

    const queue = await Queue.findById(queueId);
    if (!queue) {
      return res.status(404).json({ message: "Queue not found" });
    }

    const totalTickets = await Ticket.countDocuments({ queueId });

    res.json({
      queueId: queue._id,
      name: queue.name,
      currentNumber: queue.currentNumber,
      totalTickets,
      isActive: queue.isActive
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;