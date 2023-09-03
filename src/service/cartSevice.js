const connection = require('../config/database')

module.exports = {
    getcartSevice: async (email) => {
        try {
            let [rs] = await connection.query('select user_id from res_users where email=?', [email])
            let user_id = rs[0].user_id

            let [result] = await connection.query('select cartId,user_id,p.thumbnail ,p.productID ,quatity ,p.productName ,p.unitPrice  from cart c,products p where c.product_id =p.productID and user_id=? ', [user_id])

            return result
        } catch (error) {
            console.log('error', error)
        }
    },
    updateQuantity: async (id, quantity) => {
        try {
            let [check] = await connection.query('select quatity from cart where cartId=?', [id])

            if (check[0].quatity != quantity) {

                let [rs] = await connection.query('update cart set quatity=? where cartId=?', [quantity, id])
                return rs
            }
            else {

            }
        }
        catch (error) {
            console.log('error', error)
        }
    },
    createCart: async (id, email) => {
        try {

            let [rs] = await connection.query('select user_id from res_users where email=?', [email])
            let user_id = rs[0].user_id

            let [check] = await connection.query('select product_id,quatity from cart where user_id=? and product_id=?', [user_id, id])
            if (check.length < 1) {

                let [result] = await connection.query('insert into cart(user_id,product_id) values (?,?)', [user_id, id])
            }
            else {
                let soluong = check[0].quatity
                soluong++;

                let [quantity] = await connection.query('update cart set quatity =? where user_id=? and product_id=?', [soluong, user_id, id])


            }
            return result;
        } catch (error) {

        }
    },
    deleteCartSevice: async (id) => {
        let [check] = await connection.query('select cartId from cart where cartId=?', [id])
        if (check.length > 0) {
            let [result] = await connection.query('delete from cart where cartId=?', [id])
        }
    },
    coutcartSevice: async (email) => {
        try {
            let [rs] = await connection.query('select user_id from res_users where email=?', [email])
            let user_id = rs[0].user_id
            let [result] = await connection.query('select count(cartId) count from cart where user_id =?', [user_id]);
            let count = result && result.length > 0 ? result[0] : {};

            return count
        } catch (error) {
            console.log('Error', error)
        }

    }

}