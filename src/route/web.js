const express = require('express')
const router = express.Router()
const { getindex, getDasboard, } = require('../controllers/indexController')
const { getAdminBooks, getAddBooks, createBook, getUpdatebook, postUpdateBook, getdeleteBook, postdeleteBook } = require('../controllers/adminBookController')
const { getAdminAuthors, getCreateAuthors } = require('../controllers/adminAuthorController')

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



// router.get('/book-pdf',)

module.exports = router