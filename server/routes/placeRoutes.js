const express = require("express");
const Place = require("../models/Place");

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { name, type, location } = req.body;

    const place = new Place({
      name,
      type,
      location
    });

    await place.save();

    res.status(201).json(place);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;