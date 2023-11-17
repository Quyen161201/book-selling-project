const { dashboardSevice } = require('../service/dashboardSevice')
const { coutcartSevice, getcartSevice } = require('../service/cartSevice')
const { getProfile } = require('../service/profileSevice');
module.exports = {
    getDasboard: async (req, res) => {
        let user_id = req.data[0].user_id
        let cart = await getcartSevice(user_id)
        let count = await coutcartSevice(user_id)
        let profile = await getProfile(user_id)
        let result = await dashboardSevice();

        let bills = result.list_bill;


        res.render('admin-dashboard.ejs', { dashboard: result, bills: bills, listcart: cart, count: count, profile: profile });

    }

}