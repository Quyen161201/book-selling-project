const { postRegisterSevice, postLoginSevice, updateVeryfiSevice } = require('../service/acountSevice');
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const { sendMailer } = require('../controllers/mailerController')

module.exports = {
    getRegister: async (req, res) => {
        res.render('sign-up.ejs')
    },
    postRegister: async (req, res) => {
        let { fullname, email, password } = req.body.data
        const hashedPassword = await bcrypt.hash(password, 10);
        let data = { fullname, email, password: hashedPassword }
        let rs = await postRegisterSevice(data)
        if (rs.error == 0) {
            const hashedEmail = await bcrypt.hash(data.email, 10);
            let html = `<b>BookStore</b><br> 
           <div class="sendEmail" style="width:300px;height=40px; background-color:#0dd6b8; border-radius:4px; margin-top:20px"><a class="link-veryfi" href="http://localhost:8086/veryfi?email=${data.email}&token=${hashedEmail}">Xác thực tài khoản ${data.fullname}</a></div>`; // html body
            await sendMailer(process.env.EMAIL_MAILER, process.env.PASS_MAILLER, data.email, html)
        }
        else {

        }
        return res.json(rs)

    },
    getLogin: async (req, res, next) => {
        if (typeof req.session.email === 'undefined') {

            res.render('sign-in.ejs')
        }
        else res.redirect('/index')
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
                res.redirect('/index')

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

        let a = await req.session.destroy();

        res.redirect('/adminLogin')
    },

}