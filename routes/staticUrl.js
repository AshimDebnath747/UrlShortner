const express = require("express");

const router = express.Router();
//main code
router.get("/",(req,res)=>{
    return res.render("home")
})


module.exports = router;