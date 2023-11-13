
const { getListBook, getUpdateBookSevice, getListImageSevice } = require('../service/CRUDadminBook')
const { getProfile } = require('../service/profileSevice');
const { coutcartSevice, getcartSevice } = require('../service/cartSevice')
const getindex = async (req, res) => {

    let results = await getListBook()
    let email = req.session.email
    let profile = await getProfile(email)
    let result = await getcartSevice(email)
    let count = await coutcartSevice(email)

    res.render('index.ejs', { listImg: results, profile: profile, listcart: result, count: count })

}

const bookDetails = async (req, res) => {
    let id = req.params.id
    let email = req.session.email
    let profile = await getProfile(email)
    let results = await getUpdateBookSevice(id)
    let rsImg = await getListImageSevice(id)
    let result = await getcartSevice(email)

    let count = await coutcartSevice(email)

    res.render('book-page.ejs', { profile: profile, bookDetails: results, listcart: result, listImg: rsImg, count: count })
}


module.exports = { getindex, bookDetails }