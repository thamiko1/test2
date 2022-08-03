const express = require("express");
const register = require("./register")
const login = require("./login")
const contactus = require("./contactus")
// const logout = require("./logout")
const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.post("/contactus", contactus)
// router.post("./logout", logout)

module.exports = router;