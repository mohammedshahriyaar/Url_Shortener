const express = require("express");
const router = express.Router();
const { handleCreateNewShortUrl, redirecttoUrl,handleAnalytics } = require("../controllers/urlController");

// POST route to create a short URL
router.post('/', handleCreateNewShortUrl);

// GET route to redirect to the original URL using the shortId
router.get("/:id", redirecttoUrl);

router.get("/analytics/:id", handleAnalytics);
module.exports = router;
