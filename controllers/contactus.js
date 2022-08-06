const nodemailer = require('nodemailer');
const contact = async(req, res)=>{
    const {name, email, subject, message} = req.body;
    // console.log(name, email,subject, message)
    if(!email) return res.json({status: "error", error: "Please enter email"})
    else if(!name) return res.json({status: "error", error: "Please enter name"})
    else if(!message) return res.json({status: "error", error: "Please enter message"})
    else{
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: 'thamiko123@gmail.com',
                pass: 'jnloxyaeufypyomh'
            }
        });
        var mailOptions={
            from: 'thamiko123@gmail.com',
            to: 'thamiko123@gmail.com',
            subject: subject,
            text: message+'\n\n\n'+name+'\n'+email
        }
        transporter.sendMail(mailOptions)
        return res.json({status: "success", success: "Message saved"});
    }
}

module.exports = contact;
