const { coutcartSevice, getcartSevice } = require('../service/cartSevice')
const { uploadSingleFile, uploatMutiFile } = require('../service/uploadFile')
const { createProfile, getProfile, updatePassSevice } = require('../service/profileSevice');
const { postLoginSevice } = require('../service/acountSevice')
const bcrypt = require('bcrypt');
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
            console.log('tai khoa khong hop le')
        }

    }

}