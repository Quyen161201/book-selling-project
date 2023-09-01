const { adimCategoryCreate, getAdimCategory, getUpdateCategory, postUpdateCategory, postDeleteAuthorSevice } = require('../service/CRUDadminCategory')
module.exports = {

    getAdminCategory: async (req, res) => {
        let result = await getAdimCategory();
        let rs = result.result

        res.render('admin-category.ejs', { listCategory: rs })
    },
    getAdminCategoryCreate: async (req, res) => {
        res.render('admin-add-category.ejs')
    },
    postAdminCategoryCreate: async (req, res) => {
        let name = req.body.name;
        let rs = await adimCategoryCreate(name)
        res.redirect('/admin-category')

    },
    getAdminUpdateCategory: async (req, res) => {
        const id = req.params.id

        let rs = await getUpdateCategory(id)

        res.render('adminUpdate-category.ejs', { category: rs })
    },
    postAdminCategoryUpdate: async (req, res) => {
        let { name, id } = req.body
        let rs = await postUpdateCategory(name, id);


        res.redirect('/admin-category')
    },
    postDeleteCategory: async (req, res) => {
        const id = req.params.id;
        let rs = await postDeleteAuthorSevice(id);
        res.redirect('/admin-category')

    }

}