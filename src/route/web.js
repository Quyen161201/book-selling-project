const express = require('express');
const connection = require('../config/database')


const router = express.Router()
const { getindex, getDasboard, bookDetails } = require('../controllers/indexController')
const { getAdminBooks, getAddBooks, createBook, getUpdatebook, postUpdateBook, getdeleteBook, postdeleteBook } = require('../controllers/adminBookController')
const { getAdminAuthors, getCreateAuthors, postCreateAuthor, getUpdateAuthors, postUpdateAuthor, postDeleteAuthor } = require('../controllers/adminAuthorController')
const { getAdminCategory, getAdminCategoryCreate, postAdminCategoryCreate, getAdminUpdateCategory, postAdminCategoryUpdate, postDeleteCategory } = require('../controllers/adminCategoryController')
const { searchProduct } = require('../controllers/serach');
const { getRegister, postRegister, getLogin, postLogin, getLogout } = require('../controllers/acount');
const { checkveryfi } = require('../controllers/mailerController')
const { checkSesssion } = require('../middleware/userMiddle');
const { notifycation } = require('../middleware/notifycation')

const { profile, postprofile, updatepass, sendMail, postcode, forgetPass, updateContact } = require('../controllers/profileController')

const { getCart, postCart, updateCart, deleteCart } = require('../controllers/cartController')


// index
router.get('/index', getindex);
//dashboard
router.get('/admin-dashboard', checkSesssion, getDasboard,);

//admin book
router.get('/admin-books', checkSesssion, getAdminBooks);
router.get('/admin-add-book', checkSesssion, getAddBooks);
router.post('/admin-books', checkSesssion, createBook)
router.get('/admin-update-book/:id', checkSesssion, getUpdatebook);
router.post('/admin-update-book', checkSesssion, postUpdateBook);
router.get('/getadmin-delete-book/:id', checkSesssion, getdeleteBook)

router.post('/postadmin-delete-book/:id', checkSesssion, postdeleteBook)

//admin author
router.get('/admin-author', checkSesssion, getAdminAuthors);
router.get('/adminAuthor-create', checkSesssion, getCreateAuthors);
router.post('/admin-createAuthor', checkSesssion, postCreateAuthor);
router.get('/adminAuthor-update/:id', checkSesssion, getUpdateAuthors);
router.post('/admin-updateAuthor', checkSesssion, postUpdateAuthor);
router.post('/admin-deleteAuthor/:id', checkSesssion, postDeleteAuthor);

// adim category
router.get('/admin-category', checkSesssion, getAdminCategory);
router.get('/adminCategory-create', checkSesssion, getAdminCategoryCreate);
router.post('/adminCategory-postCreate', checkSesssion, postAdminCategoryCreate);
router.get('/adminCategory-update/:id', checkSesssion, getAdminUpdateCategory);
router.post('/adminCategory-update', checkSesssion, postAdminCategoryUpdate);
router.post('/admin-deleteCategory/:id', checkSesssion, postDeleteCategory);

//search
router.post('/getseachbook', checkSesssion, searchProduct);

// đăng ký, đăng nhập, đăng xuất

router.get('/adminRegister', getRegister)
router.post('/adminPostRegister', postRegister)
router.get('/adminLogin', getLogin);
router.post('/adminPostlogin', postLogin)
router.get('/AdminLogout', getLogout)

//homeBook

router.get('/book-page/:id', checkSesssion, bookDetails)

// cart
router.get('/getcart', checkSesssion, getCart)
router.post('/cart/:id', checkSesssion, postCart)
router.post('/updateCart', updateCart)
router.post('/deleteCart/:id', deleteCart)

//profile
router.get('/profile', checkSesssion, profile);
router.post('/postProfile', checkSesssion, postprofile);
router.post('/updatePassword', checkSesssion, updatepass);
router.post('/updateContact', checkSesssion, updateContact);




// veryfi email
router.get('/veryfi', checkveryfi);

router.post('/sendMail', sendMail);
router.post('/postCode', postcode);
router.post('/forgetPassword', forgetPass);
router.post('/notification', notifycation)

















// router.get('/book-pdf',)

module.exports = router