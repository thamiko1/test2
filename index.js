const express = require('express');
const app = express();
const cookie = require("cookie-parser");
const path = require('path');
const sql = require('mysql');

// const register = require('register');

const db = sql.createConnection({
    host:"localhost",
    user: "root",
    password: "hIhqus6PCsxesojD",
    database: "online_learning",
    socketPath: '/var/run/mysqld/mysqld.sock'
})
db.connect((err) => {
    if (err) throw err;
    console.log("Database Connected..");
})
app.use(cookie())
app.use(express.json())

app.use(express.static(path.join(__dirname,'public')))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

app.get("/", (req,res) =>{
    res.render("home");
})
app.get("/register", (req,res) => {
    res.render("register.ejs", {root:"./views"});
})
app.get("/login", (req, res) =>{
    res.render("login.ejs", {root: "./views"});
})
app.use("/api", require("./controllers/auth"));

// app.post("/register", function(req, res){
//     var email = req.body.email;
//     console.log(req.body);
//     var transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth:{
//             user: 'thamiko123@gmail.com',
//             pass: 'jnloxyaeufypyomh'
//         }
//     });
//     var mailOptions={
//         from: 'thamiko123@gmail.com',
//         to: 'email',
//         subject: 'register succeed',
//         text: 'Your register is succeed, thanks.'
//     }
//     transporter.sendMail(mailOptions)
// })

app.listen(3000,()=>{
    console.log("Listening on port 3000")
})
