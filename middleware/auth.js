
const {getUser} = require("../services/sessionId")


const checkAForAuthentication = (req,res,next)=>{
    const cookieToken = req.cookies?.token
    req.user = null;
    if(!cookieToken ) return next();
    const user = getUser(cookieToken)

    req.user = user;

    next();
}

const restrictTo = (roles = [])=>{
    return (req,res,next)=>{
        if(!req.user) return res.redirect("/login")

        if(!roles.includes(req.user.role)) return res.end("unauthorized!")

        return next() ;
    }

}
module.exports = {
   checkAForAuthentication,
   restrictTo,
}