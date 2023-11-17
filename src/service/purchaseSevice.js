const connection = require('../config/database');
module.exports = {
    getPurchase: async (user_id) => {
        try {
            let listPuchases = {};

            let [result] = await connection.query('SELECT o.orderId,p.thumbnail,c.quatity  ,c.cartId ,c.total ,p.productName,o.totalOrder,o.status,o.invoice,p.unitPrice FROM cart_order co JOIN cart c ON co.cart_id = c.cartId JOIN products p ON c.product_id = p.productID JOIN orderdetails o ON co.order_id = o.orderId where o.user_id=?', [user_id]);
            let [rs2] = await connection.query('select orderId ,totalOrder ,status  from orderdetails o where o.user_id =?', [user_id])

            return listPuchases = {
                puchase_product: result,
                total_status: rs2
            }
        }
        catch (error) {
            console.log(error)
        }
    },
    repurchaseService: async (user_id, repuchase) => {
        try {

            let [result] = await connection.query('update cart set status=? where cartId=? and user_id=?', [1, repuchase, user_id])
        } catch (error) {
            console.log(error);
        }

    },
    updatePurchaseSevice: async (id, status) => {
        let [result] = await connection.query('update orderdetails set status=? where orderId =?', [status, id])
    }

}