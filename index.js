const express = require('express');
const path = require("path");
const cookieParser = require("cookie-parser");

const URL = require("./models/url");

//auth
const { restrictToLoggedInUserOnly, checkAuth } = require('./middlewares/auth');


//router
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const {MongoDBConnect} = require("./Database/connect");


//connecting to database
MongoDBConnect("mongodb://127.0.0.1:27017/url-shortener")
.then(() => console.log("Database Connected"));

//creating the server
const app  = express();
const PORT = 8000;

//viewengine
app.set("view engine", "ejs"); // setting ejs view engine for SSR
app.set("views" , path.resolve("./views") )

//middleware
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());

//routes
app.use("/url",restrictToLoggedInUserOnly, urlRoute);
app.use("/", checkAuth, staticRoute);
app.use("/user", userRoute);

app.listen (PORT , ()=> {
    console.log("server started")
})