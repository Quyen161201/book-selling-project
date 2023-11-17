const { orderProductSevice } = require('../service/orderSevice')

module.exports = {
    createCod: async (req, res) => {
        let user_id = req.data[0].user_id;
        const data = req.session.orderProduct;
        const payment_status = 0;
        const result = await orderProductSevice(data, payment_status, user_id);

        res.render('success.ejs', { code: "00" });

    }
}