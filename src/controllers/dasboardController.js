const { dashboardSevice } = require('../service/dashboardSevice')
const { coutcartSevice, getcartSevice } = require('../service/cartSevice')
const { getProfile } = require('../service/profileSevice');
module.exports = {
    getDasboard: async (req, res) => {
        let email = req.session.email;
        let cart = await getcartSevice(email)
        let count = await coutcartSevice(email)
        let profile = await getProfile(email)
        let result = await dashboardSevice();

        let bills = result.list_bill;


        res.render('admin-dashboard.ejs', { dashboard: result, bills: bills, listcart: cart, count: count, profile: profile });

    }

}