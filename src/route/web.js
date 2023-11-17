const express = require('express');
const connection = require('../config/database')


const router = express.Router()

const { getindex, bookDetails } = require('../controllers/indexController')
const { getDasboard } = require('../controllers/dasboardController');
const { getAdminBooks, getAddBooks, createBook, getUpdatebook, postUpdateBook, getdeleteBook, postdeleteBook } = require('../controllers/adminBookController')
const { getAdminAuthors, getCreateAuthors, postCreateAuthor, getUpdateAuthors, postUpdateAuthor, postDeleteAuthor } = require('../controllers/adminAuthorController')
const { getAdminCategory, getAdminCategoryCreate, postAdminCategoryCreate, getAdminUpdateCategory, postAdminCategoryUpdate, postDeleteCategory } = require('../controllers/adminCategoryController')
const { searchProduct } = require('../controllers/serach');

// login, logout
const { getRegister, postRegister, getLogin, postLogin, getLogout } = require('../controllers/acount');
const { checkveryfi } = require('../controllers/mailerController')
const { checkLogin, checkPermissionAdmin, checkPermissionUser } = require('../middleware/permission');
const { notifycation } = require('../middleware/notifycation');

const { orderProduct } = require('../controllers/orderController');

const { createVnpay, createOder, returnUrlPayment } = require('../controllers/bankkingVnpay');
const { createCod } = require('../controllers/paycod');

const { profile, postprofile, updatepass, sendMail, postcode, forgetPass, updateContact } = require('../controllers/profileController')

const { getCart, postCart, updateCart, deleteCart, postContact, deleteContact } = require('../controllers/cartController')
const { getPurchase, repurchase, updatePurchaseAdmin } = require('../controllers/purchaseController');

// index
router.get('/index', checkLogin, getindex);
//dashboard
router.get('/admin-dashboard', checkLogin, checkPermissionAdmin, getDasboard);

//admin book
router.get('/admin-books', checkLogin, checkPermissionAdmin, getAdminBooks);
router.get('/admin-add-book', checkLogin, checkPermissionAdmin, getAddBooks);
router.post('/admin-books', checkLogin, checkPermissionAdmin, createBook)
router.get('/admin-update-book/:id', checkLogin, checkPermissionAdmin, getUpdatebook);
router.post('/admin-update-book', checkLogin, checkPermissionAdmin, postUpdateBook);
router.get('/getadmin-delete-book/:id', checkLogin, checkPermissionAdmin, getdeleteBook)

router.post('/postadmin-delete-book/:id', checkLogin, checkPermissionAdmin, postdeleteBook)

//admin author
router.get('/admin-author', checkLogin, checkPermissionAdmin, getAdminAuthors);
router.get('/adminAuthor-create', checkLogin, checkPermissionAdmin, getCreateAuthors);
router.post('/admin-createAuthor', checkLogin, checkPermissionAdmin, postCreateAuthor);
router.get('/adminAuthor-update/:id', checkLogin, checkPermissionAdmin, getUpdateAuthors);
router.post('/admin-updateAuthor', checkLogin, checkPermissionAdmin, postUpdateAuthor);
router.post('/admin-deleteAuthor/:id', checkLogin, checkPermissionAdmin, postDeleteAuthor);

// adim category
router.get('/admin-category', checkLogin, checkPermissionAdmin, getAdminCategory);
router.get('/adminCategory-create', checkLogin, checkPermissionAdmin, getAdminCategoryCreate);
router.post('/adminCategory-postCreate', checkLogin, checkPermissionAdmin, postAdminCategoryCreate);
router.get('/adminCategory-update/:id', checkLogin, checkPermissionAdmin, getAdminUpdateCategory);
router.post('/adminCategory-update', checkLogin, checkPermissionAdmin, postAdminCategoryUpdate);
router.post('/admin-deleteCategory/:id', checkLogin, checkPermissionAdmin, postDeleteCategory);

//search
router.post('/getseachbook', checkLogin, searchProduct);

// đăng ký, đăng nhập, đăng xuất

router.get('/adminRegister', getRegister)
router.post('/adminPostRegister', postRegister)
router.get('/adminLogin', getLogin);
router.post('/adminPostlogin', postLogin)
router.get('/AdminLogout', getLogout)

//homeBook

router.get('/book-page/:id', checkLogin, checkPermissionUser, bookDetails)

// cart
router.get('/getcart', checkLogin, checkPermissionUser, getCart)
router.post('/cart/:id', checkLogin, checkPermissionUser, postCart)
router.post('/updateCart', checkPermissionUser, updateCart)
router.post('/deleteCart/:id', checkPermissionUser, deleteCart)
router.post('/postcontact', checkPermissionUser, postContact)
router.post('/deleteContact/:id', checkPermissionUser, deleteContact)

// quản lý đơn hàng
router.get('/purchase', checkLogin, checkPermissionUser, getPurchase)
router.post('/repurchase', checkLogin, checkPermissionUser, repurchase)
router.post('/updatePurchaseAdmin/:id', checkLogin, checkPermissionAdmin, updatePurchaseAdmin)

//profile
router.get('/profile', checkLogin, checkPermissionUser, profile);
router.post('/postProfile', checkLogin, checkPermissionUser, postprofile);
router.post('/updatePassword', checkLogin, checkPermissionUser, updatepass);
router.post('/updateContact', checkLogin, checkPermissionUser, updateContact);




// veryfi email
router.get('/veryfi', checkLogin, checkveryfi);

router.post('/sendMail', checkLogin, sendMail);
router.post('/postCode', checkLogin, postcode);
router.post('/forgetPassword', checkLogin, forgetPass);
router.post('/notification', checkLogin, notifycation);

// Gửi thông tin khách hàng trang thanh toán
router.post('/orderContact', checkLogin, orderProduct)

// thanh toán vn pay
router.post('/create_payment_url', checkLogin, checkPermissionUser, createVnpay);
router.get('/create_payment_oder', checkLogin, checkPermissionUser, createOder)
router.get('/returnUrl', checkLogin, checkPermissionUser, returnUrlPayment);
// thanh toán cod
router.post('/createCod', checkLogin, checkPermissionUser, createCod);


















// router.get('/book-pdf',)

module.exports = router