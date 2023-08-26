const { adimCategoryCreate, getAdimCategory, getUpdateCategory, postUpdateCategory, postDeleteAuthorSevice } = require('../service/CRUDadminCategory')
module.exports = {
    getAdminCategory: async (req, res) => {
        let result = await getAdimCategory();
        let rs = result.result
        console.log(rs)
        res.render('admin-category.ejs', { listCategory: rs })
    },
    getAdminCategoryCreate: async (req, res) => {
        res.render('admin-add-category.ejs')
    },
    postAdminCategoryCreate: async (req, res) => {
        let name = req.body.name;
        let rs = await adimCategoryCreate(name)
        res.redirect('/bookstore/admin/category')

    },
    getAdminUpdateCategory: async (req, res) => {
        const id = req.params.id

        let rs = await getUpdateCategory(id)
        console.log(rs)
        res.render('admin-update-category.ejs', { category: rs })
    },
    postAdminCategoryUpdate: async (req, res) => {
        let { name, id } = req.body
        let rs = await postUpdateCategory(name, id);
        console.log(rs);

        res.redirect('/bookstore/admin/category')
    },
    postDeleteCategory: async (req, res) => {
        const id = req.params.id;
        let rs = await postDeleteAuthorSevice(id);
        res.redirect('/bookstore/admin/category')

    }

}