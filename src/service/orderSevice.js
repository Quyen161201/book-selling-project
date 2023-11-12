const connection = require('../config/database')
module.exports = {
    cartItemsOrder: async (cartIems) => {
        try {
            if (Array.isArray(cartIems)) {
                let arr = [];
                // Bây giờ arrCart là một mảng và bạn có thể truy cập các phần tử của nó bằng cách sử dụng vòng lặp hoặc bằng chỉ số
                for (const cartItem of cartIems) {
                    console.log("cart " + cartItem)
                    let [cart_item] = await connection.query('select total from cart where cartId=?', [cartItem])
                    arr.push(cart_item)
                }
                return arr;
            } else {
                // Xử lý trường hợp khi arrCart không phải là một mảng
            }

        }
        catch (error) {
            console.log(error);
        }
    },
    orderProductSevice: async (data, payment_status, email) => {
        try {
            let [rs] = await connection.query('select user_id from res_users where email=?', [email])
            let user_id = rs[0].user_id

            let [result] = await connection.query('insert into orderdetails(quantity,totalOrder,discount,user_id,contact_id,create_at,payment_status) values (?,?,?,?,?,now(),?)', [data.cartItem.length, data.totalOrder, 0, user_id, data.idContact, payment_status]);

            // insert vao table cart_order
            let arrCart = data.cartItem;

            let new_id = result.insertId;

            const cart_values = []
            for (let i = 0; i < arrCart.length; i++) {
                cart_values.push([arrCart[i], new_id]);
            }
            let [rsCart] = await connection.query('insert into cart_order(cart_id,order_id) values ?', [cart_values]);

            // ẩn cart đã mua khỏi giỏ hàng
            let [hiddenCart] = await connection.query('update cart set status=? where cartId in(?)', [0, arrCart]);
            console.log('hiden', hiddenCart)

            return result
        }
        catch (error) {
            console.log(error);
        }
    }
}