const express = require("express");
const loggedIn = require("../controllers/loggedIn");
const router = express.Router();

router.get("/", loggedIn, (req,res) => {
    if(req.user){
        res.render("home", {status: "loggedIn", user: req.user});
    } else {
        res.render("index", {status: "no", user: "nothing"});
    }
})

router.get("/register", (req,res) =>{
    res.sendFile("register.ejs", {root: "./public"})
})
router.get("/login", (req,res) => {
    res.sendFile("login.ejs", {root: "./public/"})
})

module.exports = router;