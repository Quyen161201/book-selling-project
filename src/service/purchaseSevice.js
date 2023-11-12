const connection = require('../config/database');
module.exports = {
    getPurchase: async (email) => {
        try {
            let listPuchases = {};
            let [rs] = await connection.query('select user_id from res_users where email=?', [email])
            let user_id = rs[0].user_id;
            let [result] = await connection.query('SELECT o.orderId,p.thumbnail,c.quatity  ,c.cartId ,c.total ,p.productName,o.totalOrder,o.status,p.unitPrice FROM cart_order co JOIN cart c ON co.cart_id = c.cartId JOIN products p ON c.product_id = p.productID JOIN orderdetails o ON co.order_id = o.orderId where o.user_id=?', [user_id]);
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
    repurchaseService: async (email, repuchase) => {
        let [rs] = await connection.query('select user_id from res_users where email=?', [email])
        let user_id = rs[0].user_id;
        let [result] = await connection.query('update cart set status=? where cartId=? and user_id=?', [1, repuchase, user_id])
    }
}