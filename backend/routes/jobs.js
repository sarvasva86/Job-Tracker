console.log("Jobs routes loaded");


const express = require("express");
const router = express.Router();
const pool = require("../db"); // your Postgres connection
const authMiddleware = require("../middleware/authmiddleware");

// GET all jobs
router.get("/", authMiddleware, async (req, res) => {

  try {
    const result = await pool.query("SELECT * FROM jobs ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// POST create a new job
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { company, title, status } = req.body;

    if (!company || !title) {
      return res.status(400).json({ message: "Company and title required" });
    }
    

    const result = await pool.query(
      "INSERT INTO jobs (company, title, status, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [company, title, status || "Applied", req.user.userId]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM jobs WHERE user_id = $1 ORDER BY created_at DESC",
      [req.user.userId]
    );

    res.json(result.rows);

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});


router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { company, title, status } = req.body;

    const result = await pool.query(
      "UPDATE jobs SET company = $1, title = $2, status = $3 WHERE id = $4 RETURNING *",
      [company, title, status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM jobs WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({ message: "Job deleted successfully" });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});


router.get("/test-route", (req, res) => {
  res.json({ message: "TEST ROUTE WORKING" });
});



module.exports = router;
