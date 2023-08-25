const connection = require('../config/database')
const { uploadSingleFile, uploatMutiFile } = require('../service/uploadFile')
const fileUpload = require('express-fileupload');
const { postCreateBookSevice, getAdminBooksSevice, getlistCategorySevice, getlistAuthorSevice, getUpdateBookSevice, postUpdateBookSevice, getListImageSevice, postAdminDeleteSevice } = require('../service/CRUDadminBook')
module.exports = {
    getAdminBooks: async (req, res) => {
        let results = await getAdminBooksSevice();
        return res.render('admin-books.ejs', { listAdminBooks: results })
    },
    getAddBooks: async (req, res) => {
        let resultsCate = await getlistCategorySevice();
        let resultAuthor = await getlistAuthorSevice()
        res.render('admin-add-book.ejs', { listCategory: resultsCate, listAuthor: resultAuthor })
        console.log(resultAuthor)
    },
    createBook: async (req, res) => {
        let { name, price, quantity, desciption, author, category, price_root } = req.body;

        let bookUrl = "";
        let bookUrlImge = "";
        let resultImg;
        console.log('image', req.files.image)
        if (!req.files || Object.keys(req.files).length === 0) {
            console.log('no files')
        }
        else {
            if (req.files.image.length > 1) {
                resultImg = await uploatMutiFile(req.files.image);
                bookUrlImge = resultImg;
            }
            else {

                resultImg = await uploadSingleFile(req.files.image);
                bookUrlImge = resultImg;
            }


        }
        if (!req.files) {

        }
        else {
            let result = await uploadSingleFile(req.files.bookPdf);
            bookUrl = result
        }

        let dataBoook = { name, price, price_root, quantity, desciption, author, image: bookUrlImge, category, bookPdf: bookUrl }
        let rs = await postCreateBookSevice(dataBoook);


        res.redirect('/admin-books')
    },
    getUpdatebook: async (req, res) => {
        let productID = req.params.id
        let result = await getUpdateBookSevice(productID)
        let resultsCate = await getlistCategorySevice();
        let resultAuthor = await getlistAuthorSevice();
        let listImage = await getListImageSevice(productID);
        console.log('listImage', listImage)
        res.render("admin-update-book.ejs", { listUpdateBook: result, listCategory: resultsCate, listAuthor: resultAuthor, listImage: listImage })
    },

    postUpdateBook: async (req, res) => {
        let { productID, name, price, quantity, desciption, author, category, } = req.body;
        let bookUrl = "";
        let bookUrlImge = "";
        let resultImg = ""
        if (!req.files) {

        }
        else {

            if (req.files.image.length > 1) {
                resultImg = await uploatMutiFile(req.files.image);
                bookUrlImge = resultImg;
            }
            else {
                resultImg = await uploadSingleFile(req.files.image);
                bookUrlImge = resultImg;
            }


        }
        if (!req.files) {

        }
        else {
            let result = await uploadSingleFile(req.files.bookPdf);
            bookUrl = result
        }
        let dataBoook = { productID, name, price, quantity, desciption, author, image: bookUrlImge, category, bookPdf: bookUrl }
        let rs = await postUpdateBookSevice(dataBoook);

        res.redirect('/admin-books')

    },
    getdeleteBook: async (req, res) => {
        // // res.redirect('/admin-books')
        // let productID = req.params.id
        // let result = await getUpdateBookSevice(productID)
        // res.render('getAdminDelete.ejs', { confimDelete: result })

    },
    postdeleteBook: async (req, res) => {
        let productID = req.params.id;

        let result = await postAdminDeleteSevice(productID);
        res.redirect('/admin-books')
    }

}