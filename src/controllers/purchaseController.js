const { getListBook, getUpdateBookSevice, getListImageSevice } = require('../service/CRUDadminBook')
const { getProfile } = require('../service/profileSevice');
const { coutcartSevice, getcartSevice } = require('../service/cartSevice')

module.exports = {
    getPurchase: async (req, res) => {
        let results = await getListBook()
        let email = req.session.email
        let profile = await getProfile(email)
        let result = await getcartSevice(email)
        let count = await coutcartSevice(email)
        res.render('purchase.ejs', { listImg: results, profile: profile, listcart: result, count: count })
    }
}