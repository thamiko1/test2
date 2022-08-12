const sql = require("mysql");
const db = sql.createConnection({
    host: process.env.DATABASE_HOST,
    user: "root",
    password: "",
    database: process.env.DATABASE
    // socketPath: '/var/run/mysqld/mysqld.sock'
})
const { promisify } = require("util");
const jwt= require("jsonwebtoken");

const loggedIn = async (req, res,next) =>{
    try {
        // 1. Verify the token
        const decoded = await promisify(jwt.verify)(req.cookies.userSave,
            "asdajshdahsddi2j(@(DJjdisjd()A"
        );
        console.log(decoded);

        // 2. Check if the user still exist
        db.query('SELECT * FROM users WHERE id = ?', [decoded.id], (err, results) => {
            console.log(results);
            if (!results) {
                return next();
            }
            req.user = results[0];
            return next();
        });
    } catch (err) {
        console.log(err)
        return next();
    }
}

module.exports = loggedIn;