const express = require('express')
const router = express.Router()
const { getindex, getDasboard, } = require('../controllers/indexController')
const { getAdminBooks, getAddBooks, createBook } = require('../controllers/adminBookController')
// const { gethomepage, createUser, create, getupdate, updateUser, deleteUser, postDeleteUser } = require('../controllers/homeController')
// router.get('/home', gethomepage)
// router.post('/create-user', createUser)
// router.get('/create', create)
// router.get('/update/:id', getupdate)
// router.post('/update_user/:id', updateUser)
// router.get('/deleteUser/:id', deleteUser)
// router.post('/delete_user/:id', postDeleteUser)

// index
router.get('/index', getindex);
//dashboard
router.get('/admin-dashboard', getDasboard);

//admin book
router.get('/admin-books', getAdminBooks);
router.get('/admin-add-book', getAddBooks);
router.post('/admin-books', createBook)


module.exports = router