const connection = require('../config/database')
const { uploadSingleFile, uploatMutiFile } = require('../service/uploadFile')
const { postCreateBookSevice, getAdminBooksSevice, getlistCategorySevice, getlistAuthorSevice, getCategory, getUpdateBookSevice, postUpdateBookSevice, getListImageSevice, postAdminDeleteSevice } = require('../service/CRUDadminBook')
const { coutcartSevice, getcartSevice } = require('../service/cartSevice')
const { getProfile } = require('../service/profileSevice');
module.exports = {
    getAdminBooks: async (req, res) => {
        let email = req.session.email
        let results = await getAdminBooksSevice();
        let result = await getcartSevice(email)
        let count = await coutcartSevice(email)
        let profile = await getProfile(email)
        return res.render('admin-books.ejs', { listAdminBooks: results, listcart: result, count: count, profile: profile, })
    },
    getAddBooks: async (req, res) => {
        let id = req.params.id;
        let email = req.session.email;
        let resultsCate = await getlistCategorySevice();
        let result = await getcartSevice(email)
        let count = await coutcartSevice(email)
        let profile = await getProfile(email)
        let resultAuthor = await getlistAuthorSevice()
        res.render('admin-add-book.ejs', { listCategory: resultsCate, listAuthor: resultAuthor, listcart: result, count: count, profile: profile, })

    },
    createBook: async (req, res) => {
        let { name, price, quantity, desciption, author, category, price_root } = req.body;
        console.log('category[]', category)
        let bookUrl = "";
        let bookUrlImge = "";
        let bookUrlarrImg = ""
        let resultImg;
        let resultArrImg;

        console.log('gallery????', req.files.gallery);
        if (!req.files || Object.keys(req.files).length === 0) {
            console.log('no files')
        }
        else {
            if (req.files.gallery.length > 1) {
                resultArrImg = await uploatMutiFile(req.files.gallery);
                bookUrlarrImg = resultArrImg;

            }
            else {
                resultArrImg = await uploadSingleFile(req.files.gallery);
                bookUrlarrImg = resultArrImg;
                console.log('image????', bookUrlarrImg);
            }
            if (req.files.image) {
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

        let dataBoook = { name, price, price_root, quantity, desciption, author, image: bookUrlImge, gallery: bookUrlarrImg, category, bookPdf: bookUrl }
        let rs = await postCreateBookSevice(dataBoook);


        res.redirect('/admin-books')
    },
    getUpdatebook: async (req, res) => {
        let productID = req.params.id
        let email = req.session.email;
        let result = await getUpdateBookSevice(productID)
        let resultsCate = await getCategory(productID);
        let rsCategory = await getlistCategorySevice()
        console.log('category', resultsCate)
        let resultAuthor = await getlistAuthorSevice();
        let listImage = await getListImageSevice(productID);
        let cart = await getcartSevice(email)
        let count = await coutcartSevice(email)
        let profile = await getProfile(email)

        res.render("admin-update-book.ejs", { listUpdateBook: result, listCate: rsCategory, listCategory: resultsCate, listAuthor: resultAuthor, listImage: listImage, listcart: cart, count: count, profile: profile, })
    },

    postUpdateBook: async (req, res) => {
        let { productID, name, price, quantity, desciption, author, category, fakethumbnail } = req.body;

        let bookUrl = "";
        let bookUrlImge = "";
        let resultImg = ""
        let bookUrlarrImg = "";
        let resultArrImg;

        if (req.files && req.files.image) {

            resultImg = await uploadSingleFile(req.files.image);
            bookUrlImge = resultImg;

        }
        else {
            bookUrlImge = fakethumbnail;
        }
        if (req.files && req.files.gallery) {
            if (req.files.gallery.length > 1) {
                resultArrImg = await uploatMutiFile(req.files.gallery);
                bookUrlarrImg = resultArrImg;

            }
            else {
                resultArrImg = await uploadSingleFile(req.files.gallery);
                bookUrlarrImg = resultArrImg;
            }

        } else {
            console.log('req.files.gallery is null or undefined');
            let listImage = await getListImageSevice(productID);
            const newlistImage = listImage.map(obj => obj.name);
            console.log('newlisst>>>', newlistImage);
            bookUrlarrImg = newlistImage
        }
        // else {

        if (!req.files) {

        }
        else {
            let result = await uploadSingleFile(req.files.bookPdf);
            bookUrl = result
        }
        let dataBoook = { productID, name, price, quantity, desciption, author, image: bookUrlImge, gallery: bookUrlarrImg, category, bookPdf: bookUrl }
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