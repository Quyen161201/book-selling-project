const { coutcartSevice, getcartSevice } = require('../service/cartSevice')
const { uploadSingleFile, uploatMutiFile } = require('../service/uploadFile')
const { createProfile, getProfile, updatePassSevice, forgetPassService } = require('../service/profileSevice');
const { postLoginSevice } = require('../service/acountSevice')
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const session = require('express-session');
// const { assign } = require('nodemailer/lib/shared');
module.exports = {
    profile: async (req, res) => {
        let email = req.session.email
        let data = await getProfile(email)
        let result = await getcartSevice(email)
        let count = await coutcartSevice(email)
        res.render('profile-edit.ejs', { profile: data, listcart: result, count: count })
    },
    postprofile: async (req, res) => {
        let email = req.session.email
        let { fname, lname, username, date, city, district, ward, address, customRadio1, fakethumbnail } = req.body;
        let bookUrlImge = "";
        if (!req.files || Object.keys(req.files).length === 0) {

            bookUrlImge = fakethumbnail
        }
        else {
            resultImg = await uploadSingleFile(req.files.thumbnail);
            bookUrlImge = resultImg;
        }
        let data = { thumbnail: bookUrlImge, fname, lname, username, date, city, district, ward, address, email, customRadio1 }
        let rs = await createProfile(data);

        res.redirect('/profile')
    },
    updatepass: async (req, res) => {
        let email = req.session.email
        let { cpass, npass, vpass } = req.body.data;
        const hashedPassword = await bcrypt.hash(npass, 10);
        console.log('hashedPassword', hashedPassword)
        let data = { email, cpass, npass: hashedPassword, vpass }
        let checkCpass = await postLoginSevice(data.email, data.cpass)
        let password = data.cpass
        if (checkCpass.length > 0) {
            let passw = checkCpass[0].password
            let check = bcrypt.compareSync(password, passw); // true
            if (check === true) {
                let rs = await updatePassSevice(data);
                let session = req.session;
                session.password = hashedPassword
                console.log('ok')
                let result = {
                    error: 0,
                    status: 'đổi mật khẩu thành công'
                }
                return res.json(result)
            }
            else {
                console.log('no ok')
                let result = {
                    error: 1,
                    status: 'Mật khẩu cũ không chính xác'
                }
                return res.json(result)
            }
        }
        else {

        }

    },
    sendMail: async (req, res) => {
        let email = req.session.email
        if (email) {
            let code = Math.random().toString().slice(2, 8)

            if (req.session.code === null || !req.session.code) {
                let send = req.session.code = code;
                setTimeout(() => {
                    req.session.code = null;
                    req.session.save();
                }, 300000);
                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    secure: true,
                    auth: {
                        user: process.env.EMAIL_MAILER,
                        pass: process.env.PASS_MAILLER
                    },
                });
                await transporter.sendMail({

                    from: process.env.EMAIL_MAILER, // sender address
                    to: `${email}`, // list of receivers
                    subject: "Bookstore ✔", // Subject line
                    text: "Xác thực tài khoản", // plain text body
                    html: `<b>BookStore</b><br> 
                        Mã xác thực của bạn : ${send}
                    `
                },

                    (err) => {

                    },
                )

                return res.json({
                    error: 0
                })
            }
            else {
                console.log('mail không tồn tại')
            }
        }


    },
    postcode: async (req, res, next) => {
        let code = req.session.code;
        let payload = req.body.payload;
        if (payload != '') {

            if (code == payload) {
                return res.status(200).json({
                    error: 0,
                    status: 'Success'
                })
            }
            else {

                return res.status(400).json({
                    error: 1,
                    status: 'error'
                })
            }
        }
        else {
            return res.status(400).json({
                error: 1,
                status: 'error'
            })
        }


    },
    forgetPass: async (req, res, next) => {
        let email = req.session.email;
        const hashedPassword = await bcrypt.hash(req.body.data.password, 10);
        let data = { email, npass: hashedPassword }
        if (email) {
            let rs = await updatePassSevice(data);
            let result = {
                error: 0,
                status: 'đổi mật khẩu thành công'
            }
            setTimeout(() => {
                req.session.code = null;
                req.session.save();
            }, 10000);
            return res.json(result)
        }
        else {
            let result = {
                error: 1,
                status: 'Đổi mật khẩu không thành công'
            }
            return res.json(result)
        }


    }

}