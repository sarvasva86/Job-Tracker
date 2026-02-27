require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
const jobsRoutes = require("./routes/jobs.js");

app.use("/auth", authRoutes);
app.use("/jobs", jobsRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Job Tracker Backend is running 🚀" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
