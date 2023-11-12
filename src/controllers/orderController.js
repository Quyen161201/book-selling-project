const { cartItemsOrder } = require('../service/orderSevice')

module.exports = {
    orderProduct: async (req, res, next) => {
        const id = req.body.id;
        const carts_id = req.body.arrCart;
        let cartItem = await cartItemsOrder(carts_id);
        let totalSum = 0;
        for (const item of cartItem) {
            for (const subItem of item) {
                totalSum += subItem.total;
            }
        }
        const ship = 30000;
        //cộng thêm phí ship 30000
        req.session.totalOrder = totalSum + ship;

        // Lưu các giá trị id, carts_id, và totalOrder vào một mảng orderData
        const orderData = { idContact: id, cartItem: carts_id, shipperFee: ship, totalOrder: req.session.totalOrder };

        // Lưu mảng orderData vào session với tên orderProduct
        req.session.orderProduct = orderData;
        console.log('orderProduct', req.session.orderProduct);
        console.log('total', req.session.orderProduct.totalOrder)
        next();



    }
}