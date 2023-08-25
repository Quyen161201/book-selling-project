const connection = require('../config/database')
const { uploadSingleFile, uploatMutiFile } = require('../service/uploadFile');
const { postCreateAutorSevice, getAuthorService, postUpdateAuthorSevice, postDeleteAuthorSevice } = require('../service/CRUDadminAuthor')
const { getlistAuthorSevice } = require('../service/CRUDadminBook')
const fileUpload = require('express-fileupload');

module.exports = {
    // hiển thị
    getAdminAuthors: async (req, res) => {
        let rs = await getlistAuthorSevice();

        res.render('admin-author.ejs', { listAuthor: rs });

    },
    //thêm
    getCreateAuthors: async (req, res) => {
        res.render('admin-add-author.ejs')
    },
    postCreateAuthor: async (req, res) => {
        let { name, description } = req.body;

        let rsdata = await postCreateAutorSevice({ name, description });


        res.redirect('/bookstore/admin/author')

    },
    // sữa
    getUpdateAuthors: async (req, res) => {
        let id = req.params.id;
        let rs = await getAuthorService(id)
        res.render('admin-update-author.ejs', { author: rs })
    },
    postUpdateAuthor: async (req, res) => {
        let { id, name, description } = req.body;

        let rs = await postUpdateAuthorSevice({ id, name, description });
        res.redirect('/bookstore/admin/author')

    },
    postDeleteAuthor: async (req, res) => {
        let id = req.params.id;
        let rs = await postDeleteAuthorSevice(id);
        console.log(rs);
        res.redirect('/bookstore/admin/author')
    }




}