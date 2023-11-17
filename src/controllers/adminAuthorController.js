const connection = require('../config/database')
const { uploadSingleFile, uploatMutiFile } = require('../service/uploadFile');
const { postCreateAutorSevice, getAuthorService, postUpdateAuthorSevice, postDeleteAuthorSevice } = require('../service/CRUDadminAuthor')
const { getlistAuthorSevice } = require('../service/CRUDadminBook')
const fileUpload = require('express-fileupload');
const { coutcartSevice, getcartSevice } = require('../service/cartSevice')
const { getProfile } = require('../service/profileSevice');
module.exports = {
    // hiển thị

    getAdminAuthors: async (req, res) => {
        let user_id = req.data[0].user_id
        let rs = await getlistAuthorSevice();
        let result = await getcartSevice(user_id)
        let count = await coutcartSevice(user_id)
        let profile = await getProfile(user_id)
        res.render('admin-author.ejs', { listAuthor: rs, listcart: result, count: count, profile: profile });

    },
    //thêm
    getCreateAuthors: async (req, res) => {
        let user_id = req.data[0].user_id
        let result = await getcartSevice(user_id)
        let count = await coutcartSevice(user_id)
        let profile = await getProfile(user_id)
        res.render('admin-add-author.ejs', { listcart: result, count: count, profile: profile })
    },
    postCreateAuthor: async (req, res) => {
        let { name, description } = req.body;

        let rsdata = await postCreateAutorSevice({ name, description });


        res.redirect('/admin-author')

    },
    // sữa
    getUpdateAuthors: async (req, res) => {
        let user_id = req.data[0].user_id
        let result = await getcartSevice(user_id)
        let count = await coutcartSevice(user_id)
        let profile = await getProfile(user_id)
        let id = req.params.id;
        let rs = await getAuthorService(id)

        res.render('admin-update-author.ejs', { author: rs, listcart: result, count: count, profile: profile })
    },
    postUpdateAuthor: async (req, res) => {
        let { id, name, description } = req.body;

        let rs = await postUpdateAuthorSevice({ id, name, description });
        res.redirect('/admin-author')

    },
    postDeleteAuthor: async (req, res) => {
        let id = req.params.id;

        let rs = await postDeleteAuthorSevice(id);

        res.redirect('/admin-author')
    }




}