const { coutcartSevice, getcartSevice } = require('../service/cartSevice')
const { uploadSingleFile, uploatMutiFile } = require('../service/uploadFile')
const { createProfile, getProfile } = require('../service/profileSevice')
module.exports = {
    profile: async (req, res) => {
        let email = req.session.email
        let data = await getProfile(email)
        let result = await getcartSevice(email)
        let count = await coutcartSevice(email)
        console.log(data.city, 'city')

        res.render('profile-edit.ejs', { profile: data, listcart: result, count: count })
    },
    postprofile: async (req, res) => {
        let email = req.session.email
        let { fname, lname, username, date, city, district, ward, address, customRadio1 } = req.body;
        let bookUrlImge = "";
        if (!req.files || Object.keys(req.files).length === 0) {

        }
        else {
            resultImg = await uploadSingleFile(req.files.thumbnail);
            bookUrlImge = resultImg;
        }
        let data = { thumbnail: bookUrlImge, fname, lname, username, date, city, district, ward, address, email, customRadio1 }
        let rs = await createProfile(data);

        res.redirect('/profile')
    }
}