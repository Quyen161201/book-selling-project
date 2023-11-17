
const { getListBook, getUpdateBookSevice, getListImageSevice } = require('../service/CRUDadminBook')
const { getProfile } = require('../service/profileSevice');
const { coutcartSevice, getcartSevice } = require('../service/cartSevice')
const getindex = async (req, res) => {

    let results = await getListBook()
    let user_id = req.data[0].user_id
    let profile = await getProfile(user_id)
    let result = await getcartSevice(user_id)
    let count = await coutcartSevice(user_id)

    res.render('index.ejs', { listImg: results, profile: profile, listcart: result, count: count })

}

const bookDetails = async (req, res) => {
    let id = req.params.id
    let user_id = req.data[0].user_id
    let profile = await getProfile(user_id)
    let results = await getUpdateBookSevice(id)
    let rsImg = await getListImageSevice(id)
    let result = await getcartSevice(user_id)

    let count = await coutcartSevice(user_id)

    res.render('book-page.ejs', { profile: profile, bookDetails: results, listcart: result, listImg: rsImg, count: count })
}


module.exports = { getindex, bookDetails }