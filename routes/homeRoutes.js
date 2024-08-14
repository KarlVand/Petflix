const express = require("express");
const router = express.Router();
const { videos } = require("../models");

// Route to fetch videos for carousel
router.get("/", async (req, res) => {
  try {
    console.log(videos);
    const videoList = await videos.findAll({
      order: [["id", "DESC"]],
      limit: 4,
    });
    console.log("Home route hit");
    // Render the Pug template with the videos data
    res.render("home", { videos: videoList });
  } catch (err) {
    console.error("Error fetching videos:", err);
    res
      .status(500)
      .json({ error: "Internal server error", details: err.message });
  }
});

module.exports = router;
