const User = require("../models/user");

const {v4:uuidv4 } = require("uuid");
const { setUser } = require("../services/auth");


const handleUserSignUp = async(req , res) => {
    const {name, email, password, role} = req.body;

    await User.create({
        name,
        email,
        password,
        role,
    })
    return res.redirect("/");
}

const handleUserLogin = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email, password});
    console.log(user);
    if(!user) return res.render('login' , {
            error : "invalid Email or PassWord"
        })
    
    const token = setUser(user); 
    res.cookie("uid", token);
    return res.redirect("/");
}

module.exports = {
    handleUserSignUp, handleUserLogin,
}