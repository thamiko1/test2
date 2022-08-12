require("dotenv").config();
const jwb = require("jsonwebtoken");
const sql = require("mysql");
const db = sql.createConnection({
    host: process.env.DATABASE_HOST,
    user: "root",
    password: "",
    database: "online_learning"
    // socketPath: '/var/run/mysqld/mysqld.sock'
})
const bcrypt = require("bcryptjs")

const login = async(req,res) => {
    const {email, password:Npassword} = req.body;
    if (!email || !Npassword) return res.json({status: "error", error : "Please Enter your Email and Password"});
    else{
        db.query('SELECT * FROM student_account WHERE Email =?', [email], async (err, result) =>{
            if (err) throw err;
            if (!result.length || !await bcrypt.compare(Npassword, result[0].Password) ) {
                // console.log("error");
                return res.json({status: "error", error: "Incorrect Email or password"})
            }
            else{
                console.log("login sucess")
                id =  result[0].id
                const token = jwb.sign({id}, "asdajshdahsddi2j(@(DJjdisjd()A", {
                    expiresIn: "90d"
                });
                console.log("the token is : " ,token);
                const cookieOption = {
                    expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRES*24*60*1000),
                    httpOnly: true
                }
                res.cookie("userSave", token, cookieOption);
                return res.json({status: "success", success:"User has been logged In"});
            }
        })
    }
}

module.exports = login;