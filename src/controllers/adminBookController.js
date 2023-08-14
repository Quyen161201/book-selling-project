const connection = require('../config/database')
const { uploadSingleFile, uploatMutiFile } = require('../service/uploadFile')
const { postCreateBookSevice, getlistCategorySevice, getlistAuthorSevice, } = require('../service/CRUDadminBook')
module.exports = {
    getAdminBooks: async (req, res) => {
        return res.render('admin-books.ejs')
    },
    getAddBooks: async (req, res) => {
        let resultsCate = await getlistCategorySevice();
        let resultAuthor = await getlistAuthorSevice()
        res.render('admin-add-book.ejs', { listCategory: resultsCate, listAuthor: resultAuthor })
        console.log(resultAuthor)
    },
    createBook: async (req, res) => {
        let { name, price, quantity, desciption, author, image, category, bookPdf } = req.body
        let bookUrl = "";
        let bookUrlImge = "";
        let resultImg = []
        if (!req.files) {
            console.log('no file')
        }
        else {
            if (req.body.image.length > 1) {

                resultImg = await uploatMutiFile(req.files.image)
            }
            else if (req.body.image.length == 1) {
                resultImg = await uploadSingleFile(req.files.image);
            }
            bookUrlImge = resultImg;
            let result = await uploadSingleFile(req.files.bookPdf);
            bookUrl = result
        }
        let dataBoook = { name, price, quantity, desciption, author, image: bookUrlImge, category, bookPdf: bookUrl }
        let rs = await postCreateBookSevice(dataBoook);
        console.log('<<<', bookUrl)
        console.log('>>>>>', dataBoook)
        res.redirect('/admin-books')
    }
}