
const shortid = require('shortid');// to generate short id

const URL = require("../models/url");

const handleGenerateShortURL = async (req, res) => {
    const body = req.body;
    const shortId = shortid();

    if(!body.url) {return res.status(400).json({error : "url is required"})}
    const result = await URL.create({
        shortId : shortId,
        requiredUrl : body.url,
        visitHistory : [],
    });

    return res.json({id : shortId, result : result})
};

const handlegen = async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({ shortId }, {
        $push: {
            visitHistory: {
                timestamp: Date.now(),
            }
        }
    }, { new: true }
    );
    if (!entry) {
        return res.status(400).json({ error: "short url not found" });
    }
    res.redirect(entry.requiredUrl);
}

const handleAnalytics = async(req, res) => {
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({
        totalClicks :result.visitHistory.length,
        analytics : result.visitHistory,
    });
}

module.exports = {
    handleGenerateShortURL, handlegen , handleAnalytics,
}