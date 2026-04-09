const express = require("express");
const Place = require("../models/Place");

const router = express.Router();

/**
 * CREATE PLACE
 */
router.post("/create", async (req, res) => {
  try {
    const { name, type, location } = req.body;

    // 🔍 Check if place already exists (user-friendly check)
    const existing = await Place.findOne({ name, location });

    if (existing) {
      return res.status(400).json({
        message: "Place already exists"
      });
    }

    // Create new place
    const place = new Place({
      name,
      type,
      location
    });

    await place.save();

    res.status(201).json(place);

  } catch (error) {

    // 🔥 Handle duplicate error from MongoDB (DB-level safety)
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Duplicate place not allowed"
      });
    }

    res.status(500).json({
      message: error.message
    });
  }
});

/**
 * GET ALL PLACES
 */
router.get("/", async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


// DELETE ALL PLACES (temporary for cleanup)
router.delete("/clear", async (req, res) => {
  try {
    await Place.deleteMany({});
    res.json({ message: "All places deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;