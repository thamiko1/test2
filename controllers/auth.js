const express = require("express");
const register = require("./register");
const login = require("./login");
const teacher = require("./teacherlogin");
// const logout = require("./logout")
const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.post("/login/teacher", teacher)
// router.post("./logout", logout)

module.exports = router;