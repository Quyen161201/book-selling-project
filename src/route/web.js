const express = require('express')
const router = express.Router()
const { getindex, getDasboard, } = require('../controllers/indexController')
const { getAdminBooks, getAddBooks, createBook, getUpdatebook, postUpdateBook, getdeleteBook, postdeleteBook } = require('../controllers/adminBookController')
const { getAdminAuthors, getCreateAuthors, postCreateAuthor, getUpdateAuthors, postUpdateAuthor, postDeleteAuthor } = require('../controllers/adminAuthorController')
const { getCreateCategory } = require('../controllers/adminCategoryController')

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
router.get('/bookstore/admin/author', getAdminAuthors);
router.get('/bookstore/admin/author/create', getCreateAuthors);
router.post('/bookstore/admin/createAuthor', postCreateAuthor);
router.get('/bookstore/admin/author/update/:id', getUpdateAuthors);
router.post('/bookstore/admin/updateAuthor', postUpdateAuthor);
router.post('/bookstore/admin/deleteAuthor/:id', postDeleteAuthor);

// adim category
router.get('/bookstore/admin/category/create', getCreateCategory);






// router.get('/book-pdf',)

module.exports = router