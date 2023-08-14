const express = require('express')
const router = express.Router()
const { getindex } = require('../controllers/indexController')
// const { gethomepage, createUser, create, getupdate, updateUser, deleteUser, postDeleteUser } = require('../controllers/homeController')
// router.get('/home', gethomepage)
// router.post('/create-user', createUser)
// router.get('/create', create)
// router.get('/update/:id', getupdate)
// router.post('/update_user/:id', updateUser)
// router.get('/deleteUser/:id', deleteUser)
// router.post('/delete_user/:id', postDeleteUser)

router.get('/index', getindex)
module.exports = router