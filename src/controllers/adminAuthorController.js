const connection = require('../config/database')
const { uploadSingleFile, uploatMutiFile } = require('../service/uploadFile')
const fileUpload = require('express-fileupload');

module.exports = {
    getAdminAuthors: async (req, res) => {
        res.render('admin-author.ejs')
    },
    getCreateAuthors: async (req, res) => {
        res.render('admin-add-author.ejs')
    }

}