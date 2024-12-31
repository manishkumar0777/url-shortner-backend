const router = require("express").Router();

const {handleGenerateShortURL, handlegen, handleAnalytics} = require("../controllers/url");

router.post("/url", handleGenerateShortURL);
router.get("/:shortId", handlegen);
router.get("/analytics/:shortId", handleAnalytics);

module.exports = router;