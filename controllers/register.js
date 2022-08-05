const sql = require("mysql");
const db = sql.createConnection({
    host:"localhost",
    database: "online_learning",
    user: "root",
    password: ""
})
const bcrypt = require("bcryptjs")

const register = async(req, res) => {
    const {email,Username,Name ,password: Npassword,Repassword} = req.body;
    if (!email || !Npassword) return res.json({status: "error", error : "Please Enter your Username and Password"});
    else{
        console.log(email);
        console.log(Username);
        console.log(Name);
        console.log(Repassword);
        console.log(Npassword);
        if(Repassword != Npassword) return res.json({status: "error", error:"Your password and Confirm Password is not the same"})
        db.query('SELECT * FROM student_account WHERE Username = ?', [email], async(err,result) =>{
            if (err) throw err;
            if (result[0]) return res.json ({status: "error", error: "Username has already been registered"})
            else {
                const password = await bcrypt.hash(Npassword,8);
                console.log(password);
                db.query('INSERT INTO student_account SET ?', {Email: email,Username: Username, Name:Name, Password : password}, (error, results) => {
                    if(error) throw error;
                })
                return res.json({status: "success", success: "User has been registered"});
            }
        })
    }
}

module.exports = register;