const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const queueRoutes = require("./routes/queueRoutes");
const placeRoutes = require("./routes/placeRoutes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/queues", queueRoutes);
app.use("/api/places", placeRoutes);

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Queue Management API is running");
});

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB connected");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error("MongoDB connection error:", err);
});