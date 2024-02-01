const express = require("express");

const router = express.Router();
const {
  SaveUrlAndGenerateShortUrl,
  showAnalytics
} = require("../controller/url");

router.post("/", SaveUrlAndGenerateShortUrl);
router.get("/analytics/:shortID", showAnalytics)
module.exports = router;
