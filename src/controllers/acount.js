const { postRegisterSevice, postLoginSevice } = require('../service/acountSevice');
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');

module.exports = {
    getRegister: async (req, res) => {
        res.render('sign-up.ejs')
    },
    postRegister: async (req, res) => {
        let { fullname, email, password } = req.body.data
        const hashedPassword = await bcrypt.hash(password, 10);
        let data = { fullname, email, password: hashedPassword }
        console.log(data.email)
        const transporter = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            auth: {
                user: process.env.EMAIL_MAILER,
                pass: process.env.PASS_MAILLER
            },
        });

        // send mail with defined transport object
        await transporter.sendMail({
            from: process.env.EMAIL_MAILER, // sender address
            to: `${data.email}`, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        },
            (err) => {
                console.log(err);
            }
        )


        let rs = await postRegisterSevice(data)

        return res.json(rs)

    },
    getLogin: async (req, res, next) => {
        if (typeof req.session.email === 'undefined') {
            res.render('sign-in.ejs')
        }
        else res.redirect('/admin-books')
    },
    postLogin: async (req, res) => {
        let { email, password } = req.body
        let result = await postLoginSevice(email, password)
        if (result.length > 0) {
            let passw = result[0].password

            let check = bcrypt.compareSync(password, passw); // true

            if (check === true) {
                let session = req.session

                session.email = email;
                res.redirect('/admin-books')

                let rs = {
                    error: 0,
                    status: 'Đăng nhập thành công'
                }
                // console.log(req.session.email)
                return rs

            }
            else {

                await req.session.destroy();
                let rs = {
                    error: 1,
                    status: 'Tài khoản hoặc mật khẩu không chính xác'
                }
                res.redirect('/adminLogin')
                return rs

            }


        }
        else {
            let rs = {
                error: 1,
                status: 'Tài khoản hoặc mật khẩu không chính xác'
            }
            res.redirect('/adminLogin')
            return rs

        }



    },
    getLogout: async (req, res) => {
        console.log(req.session.email, 'test')
        let a = await req.session.destroy();

        res.redirect('/adminLogin')
    }
}