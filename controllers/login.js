const jwb = require("jsonwebtoken");
const sql = require("mysql");
const db = sql.createConnection({
    host:"localhost",
    user: "root",
    database: "online_learning",
    password: ""
})
const bcrypt = require("bcryptjs")

const login = async(req,res) => {
    const {email, password:Npassword} = req.body;
    if (!email || !Npassword) return res.json({status: "error", error : "Please Enter your Email and Password"});
    else{
        db.query('SELECT * FROM teacher_account WHERE Email =?', [email], async (err, result) =>{
            if (err) throw err;
            if (!result.length || !await bcrypt.compare(Npassword, result[0].Password) ) {
                return res.json({status: "error", error: "Incorrect Email or password"})
            }
            else{
                console.log("login sucess")
                // const token = jwb.sign({id :result[0].id}, dfjsdfkjsdfjwjsfd, {
                //     httpOnly: true
                // })
                // const cookieOption = {
                //     expiresIn: new Date(Date.now() + 90*24*60*1000),
                //     httpOnly: true
                // }
                // res.cookie("userRegistered", token, cookieOption);
                return res.json({status: "success", success:"User has been logged In"});
            }
        })
    }
}

module.exports = login;