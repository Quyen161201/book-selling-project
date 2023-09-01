
const { getListBook, getUpdateBookSevice, getListImageSevice } = require('../service/CRUDadminBook')
const getindex = async (req, res) => {

    let results = await getListBook()

    return res.render('index.ejs', { listImg: results })

}
const bookDetails = async (req, res) => {
    let id = req.params.id
    let result = await getUpdateBookSevice(id)
    let rsImg = await getListImageSevice(id)


    res.render('book-page.ejs', { bookDetails: result, listImg: rsImg })
}

const getDasboard = async (req, res) => {
    return res.render('admin-dashboard.ejs')

}
module.exports = { getindex, getDasboard, bookDetails }