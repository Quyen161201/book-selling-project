const { postRegisterSevice, postLoginSevice, updateVeryfiSevice } = require('../service/acountSevice');
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




        let rs = await postRegisterSevice(data)
        if (rs.error == 0) {

            // hast email
            const hashedEmail = await bcrypt.hash(data.email, 10);

            // send mail with defined transport object

            await transporter.sendMail({
                from: process.env.EMAIL_MAILER, // sender address
                to: `${data.email}`, // list of receivers
                subject: "Bookstore ✔", // Subject line
                text: "Xác thực tài khoản", // plain text body
                html: `<b>BookStore</b><br> 
               <div class="sendEmail" style="width:300px;height=40px; background-color:#0dd6b8; border-radius:4px; margin-top:20px"><a class="link-veryfi" href="http://localhost:8086/veryfi?email=${data.email}&token=${hashedEmail}">Xác thực tài khoản ${data.fullname}</a></div>`, // html body
            },

                (err) => {

                },

            )
            console.log(`<a href="http://localhost:8086/veryfi?email=${data.email}&token=${hashedEmail}">Xac thuc</a>`)

        }
        else {

        }
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
        console.log(result)
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

        let a = await req.session.destroy();

        res.redirect('/adminLogin')
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