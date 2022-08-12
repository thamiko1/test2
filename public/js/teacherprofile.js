require("dotenv").config;
const express = require("express");
const router = express.Router();
const sql = require("mysql");
const db = sql.createConnection({
    host: process.env.DATABASE_HOST,
    user: "root",
    password: "",
    database: "online_learning"
})
function getContent(){
    return document.getElementById("email").innerHTML;
}

teacher-card.addEventListener( "submit", () => {
    const email = getContent;
    
    db.query("SELECT * FROM teacher_info WHERE Email =?"),[email], async(req,result) =>{
        if (err) throw err;
        router.get("/TeacherProfile/moreinfo", (req,res) =>{
            res.render("teachermoreprofile", {result: result});
        })
    }
})

module.exports = router;

