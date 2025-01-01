const { getUser } = require("../services/auth");

//Authentication
function checkAuththentication(req, res, next) {
    const userUid = req.cookies?.uid;
    req.user = null;

    if (!userUid) return next();

    const token = userUid;
    const user = getUser(token);

    req.user = user;
    return next();
}

//Authorization
function restrictTo(roles = []) {
    return function (req, res, next) {
        if (!req.user) return res.redirect('/login');
        if (!roles.includes(req.user.role)) return res.end("UnAuthorized");
        return next();
    }
}

module.exports = {
    checkAuththentication, restrictTo,
}