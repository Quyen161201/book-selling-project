const { dashboardSevice } = require('../service/dashboardSevice')

module.exports = {
    getDasboard: async (req, res) => {
        let result = await dashboardSevice();
        console.log(result);
        let bills = result.list_bill;
        console.log(bills)

        res.render('admin-dashboard.ejs', { dashboard: result, bills: bills });

    }

}