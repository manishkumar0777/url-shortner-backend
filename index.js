const express = require('express');


const urlRoute = require("./routes/url"); //imporing route
const {MongoDBConnect} = require("./Database/connect");

//connecting to database
MongoDBConnect("mongodb://127.0.0.1:27017/url-shortener")
.then(() => console.log("Database Connected"));

//creating the server
const app  = express();
const PORT = 8000;

app.use(express.json());

//routes
app.use("/", urlRoute);



app.listen (PORT , ()=> {
    console.log("server started")
})