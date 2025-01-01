
//const sessionIdToUserMap = new Map();
const dotenv = require("dotenv");
dotenv.config();
const secret = process.env.STAMP;

//mplementing jwt
const jwt = require('jsonwebtoken');

function setUser(user) {
    return jwt.sign({
        _id : user._id,
        email : user.email,
        role : user.role,
    }, secret);
}

function getUser(token) {
    if(!token) return null;
    try {
        return jwt.verify(token , secret);
    } catch (error) {
        return null;
    }
   
}

module.exports = {
    setUser, getUser,
}