const { orderProductSevice } = require('../service/orderSevice')

module.exports = {
    createCod: async (req, res) => {
        const email = req.session.email;
        const data = req.session.orderProduct;
        const payment_status = 0;
        const result = await orderProductSevice(data, payment_status, email);

        res.render('success.ejs', { code: "00" });

    }
}