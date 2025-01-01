const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

function MongoDBConnect() {
    try {
        mongoose.connect(process.env.DB_URL)
        .then(() => console.log("database Connected"))
        
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    MongoDBConnect,
}