const user = require("../model/user")
const { v4: uuidv4 } = require('uuid');
const { setUser,getUser } = require("../services/sessionId")
const createUser = async (req,res)=>{
    const { name , email , password} = req.body;
    await user.create({
        name,
        email,
        password,
    })
    res.status(200).redirect("/login");
}

const loginUser = async (req,res)=>{
    const { email , password} = req.body;
    const loggedInUser = await user.findOne({
        email : email,
        password : password,
    })
    if(!loggedInUser) return res.redirect("/login")
const token = setUser(loggedInUser);
res.cookie("token",token)
return res.redirect("/");
}


module.exports = { createUser,loginUser};