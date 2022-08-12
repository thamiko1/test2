require("dotenv").config();
const sql = require("mysql");
const nodemailer = require('nodemailer');
const db = sql.createConnection({
    host: process.env.DATABASE_HOST,
    user: "root",
    password: "",
    database: "online_learning"
    // socketPath: '/var/run/mysqld/mysqld.sock'
})
const bcrypt = require("bcryptjs")
const register = async(req, res) => {
    const {email,Username,Name ,password: Npassword,Repassword} = req.body;
    if (!email || !Npassword) return res.json({status: "error", error : "Please Enter your Username and Password"});
    else{
        if(Repassword != Npassword) return res.json({status: "error", error:"Your password and Confirm Password is not the same"})
        db.query('SELECT * FROM teacher_account WHERE Email = ?', [email], async(err,result) =>{
            
            // if (err) throw err;
            if (result[0]) return res.json ({status: "error", error: "Username has already been registered"})
            else {
                const password = await bcrypt.hash(Npassword,8);
                // console.log(password);
                db.query('INSERT INTO teacher_account SET ?', {Email: email,Username: Username, Name:Name, Password : password}, (error, results) => {
                    if(error) throw error;
                })
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth:{
                        user: 'thamiko123@gmail.com',
                        pass: 'jnloxyaeufypyomh'
                    }
                });
                var mailOptions={
                    from: 'thamiko123@gmail.com',
                    to: email,
                    subject: 'register succeed',
                    text: 'Your register is succeed, thanks.'
                }
                transporter.sendMail(mailOptions)
                return res.json({status: "success", success: "User has been registered"});
            }
        })
    }
}

module.exports = register;