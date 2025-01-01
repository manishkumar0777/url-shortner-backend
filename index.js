const express = require('express');
const path = require("path");
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv').config();

const URL = require("./models/url");
const PORT = process.env.PORT || 3000;

//auth
const { checkAuththentication, restrictTo } = require('./middlewares/auth');


//router
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const {MongoDBConnect} = require("./Database/connect");


//connecting to database
MongoDBConnect();

//creating the server
const app  = express();

//viewengine
app.set("view engine", "ejs"); // setting ejs view engine for SSR
app.set("views" , path.resolve("./views") )

//middleware
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());
app.use(checkAuththentication);


//routes
app.use("/url", restrictTo(["USER", "ADMIN"]), urlRoute);
app.use("/", staticRoute);
app.use("/user", userRoute);

app.listen (PORT , ()=> {
    console.log(`Server started on PORT ${PORT}`)
})