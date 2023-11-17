const { coutcartSevice, getcartSevice } = require('../service/cartSevice')
const { uploadSingleFile, uploatMutiFile } = require('../service/uploadFile')
const { createProfile, getProfile, getContactSevice, updatePassSevice, updateContactSevice } = require('../service/profileSevice');
const { getnotifiSevice } = require('../service/notificationSevice')
const { postLoginSevice } = require('../service/acountSevice')
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const session = require('express-session');
const { sendMailer } = require('../controllers/mailerController')

// const { assign } = require('nodemailer/lib/shared');
module.exports = {
    profile: async (req, res) => {
        let user_id = req.data[0].user_id
        let data = await getProfile(user_id)
        let result = await getcartSevice(user_id)
        let count = await coutcartSevice(user_id)
        let notifi = await getnotifiSevice(user_id)
        let contact = await getContactSevice(user_id)


        res.render('profile-edit.ejs', { profile: data, contact: contact, listcart: result, count: count, notifi: notifi[0] })
    },
    postprofile: async (req, res) => {
        let user_id = req.data[0].user_id
        let { fname, lname, username, date, city, district, ward, address, customRadio1, fakethumbnail } = req.body;
        let bookUrlImge = "";
        if (!req.files || Object.keys(req.files).length === 0) {

            bookUrlImge = fakethumbnail
        }
        else {
            resultImg = await uploadSingleFile(req.files.thumbnail);
            bookUrlImge = resultImg;
        }
        let data = { thumbnail: bookUrlImge, fname, lname, username, date, city, district, ward, address, user_id, customRadio1 }
        let rs = await createProfile(data);

        res.redirect('/profile')
    },
    updatepass: async (req, res) => {
        let user_id = req.data[0].user_id;
        let email = req.data[0].email
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
        let email = req.data[0].email
        let user_id = req.data[0].user_id

        if (email) {
            let code = Math.random().toString().slice(2, 8)
            let notifi = await getnotifiSevice(user_id)


            if (req.session.code === null || !req.session.code && notifi[0].email_notifi == 1) {
                let send = req.session.code = code;
                setTimeout(() => {
                    req.session.code = null;
                    req.session.save();
                }, 300000);
                let html = `<b>BookStore</b><br> 
                Mã xác thực của bạn : ${send}`
                await sendMailer(process.env.EMAIL_MAILER, process.env.PASS_MAILLER, email, html)
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
        console.log(code)
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
        let email = req.data[0].email;
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


    },
    updateContact: async (req, res) => {
        const checkemail = req.data[0].email;
        let { cno, email } = req.body.data;
        let rs = await updateContactSevice(email, cno, checkemail);

        if (typeof rs === 'undefined') {

            return res.json({
                error: 1,
                status: 'Cap nhat tai khoan k thanh cong'

            })
        }
        else {
            const hashedEmail = await bcrypt.hash(email, 10);
            let html = `<b>BookStore</b><br> 
           <div class="sendEmail" style="width:300px;height=40px; background-color:#0dd6b8; border-radius:4px; margin-top:20px"><a class="link-veryfi" href="http://localhost:8086/veryfi?email=${email}&token=${hashedEmail}">Xác thực tài khoản</a></div>`; // html body
            await sendMailer(process.env.EMAIL_MAILER, process.env.PASS_MAILLER, email, html)
            setTimeout(() => {

                req.session.destroy()
            }, 2000);
            return res.status(200).json({

                error: 0,
                status: 'Cap nhat tai khoan thanh cong'

            })
        }


    }

}