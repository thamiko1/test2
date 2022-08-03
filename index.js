require("dotenv").config();
const express = require('express');
const app = express();
const cookie = require("cookie-parser");
const path = require('path');
const sql = require('mysql');

const db = sql.createConnection({
    host:"localhost",
    user: "root",
    password: ""
})

app.use(cookie());
app.use(express.json());

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

app.get("/", (req,res) =>{
    res.render("home");
})
app.get("/register", (req,res) => {
    res.render("register.ejs", {root:"./views"});
})
app.get("/AboutUs", (req,res) => {
    res.render("AboutUs.ejs", {root: "./views"});
})
app.get("/login", (req, res) =>{
    res.render("login.ejs", {root: "./views"});
})


app.get("/contactus", (req,res) => {
    res.render("ContactUs.ejs", {root:"./views"})
})
app.use("/api", require("./controllers/auth"));


db.connect((err) => {
    if (err) throw err;
    console.log("Database Connected..")
})

app.listen(3000,()=>{
    console.log("Listening on port 3000")
})
