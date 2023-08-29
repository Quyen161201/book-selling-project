const express = require('express');
const connection = require('../config/database')

const router = express.Router()
const { getindex, getDasboard, } = require('../controllers/indexController')
const { getAdminBooks, getAddBooks, createBook, getUpdatebook, postUpdateBook, getdeleteBook, postdeleteBook } = require('../controllers/adminBookController')
const { getAdminAuthors, getCreateAuthors, postCreateAuthor, getUpdateAuthors, postUpdateAuthor, postDeleteAuthor } = require('../controllers/adminAuthorController')
const { getAdminCategory, getAdminCategoryCreate, postAdminCategoryCreate, getAdminUpdateCategory, postAdminCategoryUpdate, postDeleteCategory } = require('../controllers/adminCategoryController')
const { searchProduct } = require('../controllers/serach');
const { getRegister, postRegister, getLogin, postLogin } = require('../controllers/acount')

// index
router.get('/index', getindex);
//dashboard
router.get('/admin-dashboard', getDasboard);

//admin book
router.get('/admin-books', getAdminBooks);
router.get('/admin-add-book', getAddBooks);
router.post('/admin-books', createBook)
router.get('/admin-update-book/:id', getUpdatebook);
router.post('/admin-update-book', postUpdateBook);
router.get('/getadmin-delete-book/:id', getdeleteBook)

router.post('/postadmin-delete-book/:id', postdeleteBook)

//admin author
router.get('/admin-author', getAdminAuthors);
router.get('/adminAuthor-create', getCreateAuthors);
router.post('/admin-createAuthor', postCreateAuthor);
router.get('/adminAuthor-update/:id', getUpdateAuthors);
router.post('/admin-updateAuthor', postUpdateAuthor);
router.post('/admin-deleteAuthor/:id', postDeleteAuthor);

// adim category
router.get('/admin-category', getAdminCategory);
router.get('/adminCategory-create', getAdminCategoryCreate);
router.post('/adminCategory-postCreate', postAdminCategoryCreate);
router.get('/adminCategory-update/:id', getAdminUpdateCategory);
router.post('/adminCategory-update', postAdminCategoryUpdate);
router.post('/admin-deleteCategory/:id', postDeleteCategory);

//search
router.post('/getseachbook', searchProduct);

// đăng ký

router.get('/adminRegister', getRegister)
router.post('/adminPostRegister', postRegister)
router.get('/adminLogin', getLogin);
router.post('/adminPostlogin', postLogin)














// router.get('/book-pdf',)

module.exports = router