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
    return document.getElementById("nameofclass").innerHTML;
}

beli.addEventListener( "submit", () => {
    const nameofclass = getContent;
    console.log("test1");
    db.query("SELECT * FROM classes WHERE ClassName =?"), [nameofclass], async(err,result) =>{
        if (err) throw err;
        router.get("/classes/buyclass", (req,res) =>{
            res.render("kelasbuy.ejs", {result: result[0]});
        })
    }
})


