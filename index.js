require("dotenv").config();
const express = require('express');
const app = express();
const cookie = require("cookie-parser");
const path = require('path');
const sql = require('mysql');

const loggedIn = require("./controllers/loggedIn.js");
const logout = require("./controllers/logout.js");
const router = express.Router();

// const register = require('register');

const db = sql.createConnection({
    host: process.env.DATABASE_HOST,
    user: "root",
    password: "",
    database: "online_learning"
    // socketPath: '/var/run/mysqld/mysqld.sock'
})
db.connect((err) => {
    if (err) throw err;
    console.log("Database Connected..");
})

app.use(cookie())
app.use(express.json())

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

app.get("/", loggedIn, (req,res) =>{
    if (req.user){
        res.render("home", {status: "loggedIn", user: req.user});
    } else {
        res.render("home", {status: "no", user: "nothing"});
    }
    
})
app.get("/register",loggedIn, (req,res) => {
    if (req.user){
        res.render("register.ejs", {status: "loggedIn", user: req.user});
    } else {
        res.render("register.ejs", {status: "no", user: "nothing"});
    }
})
app.get("/AboutUs",loggedIn, (req,res) => {
    
    if (req.user){
        res.render("AboutUs.ejs", {status: "loggedIn", user: req.user});
    } else {
        res.render("AboutUs.ejs", {status: "no", user: "nothing"});
    }
})
app.get("/login",loggedIn, (req, res) =>{
    if (req.user){
        res.render("login.ejs", {status: "loggedIn", user: req.user});
    } else {
        res.render("login.ejs", {status: "no", user: "nothing"});
    }
})
app.get("/login/teacher", loggedIn, (req,res) => {
    // res.render('TeacherLogin.ejs', {root: "./views"});
    if (req.user){
        res.render("TeacherLogin.ejs", {status: "loggedIn", user: req.user});
    } else {
        res.render("TeacherLogin.ejs", {status: "no", user: "nothing"});
    }
})
app.get("/contactus", loggedIn, (req,res) => {
    // res.render("ContactUs.ejs", {root:"./views"})
    if (req.user){
        res.render("contactus", {status: "loggedIn", user: req.user});
    } else {
        res.render("contactus", {status: "no", user: "nothing"});
    }
})

db.query("SELECT * FROM teacher_info", (err,result) => {
    if (err) throw err;
    const information = JSON.parse(JSON.stringify(result));
    console.log("hasil teacher info -> ", information);
    app.get("/TeacherProfile", (req,res) => {
        if (req.user){
            res.render("TeacherProfile", {status: "loggedIn", user: req.user, information: information});
        } else {
            res.render("TeacherProfile", {status: "no", user: "nothing", information: information});
        }
    })
})

db.query("SELECT * FROM classes", (err,result) => {
    if (err) throw err;
    const classes = JSON.parse(JSON.stringify(result));
    console.log("hasil kelas dari database ->", classes);
    app.get("/classes/buyclass", (req,res) =>{
        res.render("kelasbuy", {klas: classes[0], another: classes})
    })
    app.get("/classes", (req,res) => {
        res.render("kelas", {classes: classes});
    })
})


app.use("/api", require("./controllers/auth"));
router.get("/logout", logout);

app.listen(3000,()=>{
    console.log("Listening on port 3000")
})
