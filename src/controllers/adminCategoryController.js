const { adimCategoryCreate, getAdimCategory, getUpdateCategory, postUpdateCategory, postDeleteAuthorSevice } = require('../service/CRUDadminCategory');
const { coutcartSevice, getcartSevice } = require('../service/cartSevice')
const { getProfile } = require('../service/profileSevice');
module.exports = {

    getAdminCategory: async (req, res) => {
        let email = req.session.email;
        let result = await getAdimCategory();
        let rs = result.result
        let cart = await getcartSevice(email)
        let count = await coutcartSevice(email)
        let profile = await getProfile(email)
        res.render('admin-category.ejs', { listCategory: rs, listcart: cart, count: count, profile: profile, })
    },
    getAdminCategoryCreate: async (req, res) => {
        let email = req.session.email;
        let cart = await getcartSevice(email)
        let count = await coutcartSevice(email)
        let profile = await getProfile(email)
        res.render('admin-add-category.ejs', { listcart: cart, count: count, profile: profile })
    },
    postAdminCategoryCreate: async (req, res) => {
        let name = req.body.name;
        let rs = await adimCategoryCreate(name)
        res.redirect('/admin-category')

    },
    getAdminUpdateCategory: async (req, res) => {
        const id = req.params.id
        let email = req.session.email;
        let cart = await getcartSevice(email)
        let count = await coutcartSevice(email)
        let profile = await getProfile(email)
        let rs = await getUpdateCategory(id)

        res.render('admin-update-category.ejs', { category: rs, listcart: cart, count: count, profile: profile })
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