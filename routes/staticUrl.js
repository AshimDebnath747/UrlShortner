const express = require("express");
const user = require("../model/user")
const {restrictTo } = require("../middleware/auth")
const router = express.Router();
//main code
router.get("/",(req,res)=>{
    return res.render("home")
})

router.get("/signup",(req,res)=>{
    return res.render("signup")
})

router.get("/login",(req,res)=>{
    return res.render("login")
})

router.get("/admin/url",restrictTo(["ADMIN"]),async(req,res)=>{
    const users = await user.find({})
    return res.json(users)
}
)
module.exports = router;