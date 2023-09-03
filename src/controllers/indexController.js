
const { getListBook, getUpdateBookSevice, getListImageSevice } = require('../service/CRUDadminBook')
const { coutcartSevice, getcartSevice } = require('../service/cartSevice')
const getindex = async (req, res) => {

    let results = await getListBook()
    let email = req.session.email
    let result = await getcartSevice(email)
    let count = await coutcartSevice(email)
    return res.render('index.ejs', { listImg: results, listcart: result, count: count })

}
const bookDetails = async (req, res) => {
    let id = req.params.id
    let email = req.session.email
    let results = await getUpdateBookSevice(id)
    let rsImg = await getListImageSevice(id)
    let result = await getcartSevice(email)

    let count = await coutcartSevice(email)

    res.render('book-page.ejs', { bookDetails: results, listcart: result, listImg: rsImg, count: count })
}

const getDasboard = async (req, res) => {
    return res.render('admin-dashboard.ejs')

}
module.exports = { getindex, getDasboard, bookDetails }