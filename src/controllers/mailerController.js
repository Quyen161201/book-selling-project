const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const { updateVeryfiSevice } = require('../service/veryfiSevice')
module.exports = {

    sendMailer: async (email_mailer, pass_mailer, email_user, html) => {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            auth: {
                user: email_mailer,
                pass: pass_mailer
            },
        });

        await transporter.sendMail({
            from: email_mailer, // sender address
            to: `${email_user}`, // list of receivers
            subject: "Bookstore ✔", // Subject line
            text: "Xác thực tài khoản", // plain text body
            html: html
        },

            (err) => {

            }

        )
    },
    checkveryfi: async (req, res) => {
        let check = bcrypt.compareSync(req.query.email, req.query.token)
        if (check == true) {
            let rs = await updateVeryfiSevice(req.query.email)
            res.redirect('/adminLogin')
        }
        else {

            res.redirect('/404')
        }

    }
}