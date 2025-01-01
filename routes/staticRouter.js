const URL = require('../models/url');

const router = require('express').Router();

router.get("/",  async (req, res) => {
    if(!req.user) return res.redirect("/login");
    const urls = await URL.find({createdBy : req.user._id});
    console.log(urls);
    return res.render("home", {
        urls,
    });
})

router.get("/signup", (req,res) => {
    return res.render("signup");
})

router.get("/login", (req, res) => {
    return res.render("login")
})

module.exports = router;
