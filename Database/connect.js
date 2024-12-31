const mongoose = require("mongoose");

async function MongoDBConnect(url) {
    return mongoose.connect(url);
}

module.exports = {
    MongoDBConnect,
}