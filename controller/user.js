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
    res.status(200).render("login");
}

const loginUser = async (req,res)=>{
    const { email , password} = req.body;
    const loggedInUser = await user.findOne({
        email : email,
        password : password,
    })
    if(!loggedInUser) return res.render("login")
const sessionId = uuidv4();
console.log(loggedInUser)
setUser(sessionId,loggedInUser);
res.cookie("uid",sessionId)
return res.render("home");
}


module.exports = { createUser,loginUser};