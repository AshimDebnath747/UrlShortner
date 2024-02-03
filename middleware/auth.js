
const {getUser} = require("../services/sessionId")

const authenticateForUsingUrl = (req,res,next)=>{
   const cookie = req.cookies?.uid;
   if(!cookie) return res.redirect("/login")
   const user = getUser(cookie);
   req.user = user
   next();
}

module.exports = {
    authenticateForUsingUrl,
}