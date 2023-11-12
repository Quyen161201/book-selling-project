const connection = require('../config/database')

module.exports = {
    getcartSevice: async (email) => {
        try {
            let [rs] = await connection.query('select user_id from res_users where email=?', [email])
            let user_id = rs[0].user_id

            let [result] = await connection.query('select cartId,user_id,p.thumbnail ,p.productID ,quatity ,p.productName ,p.unitPrice,status  from cart c,products p where c.product_id =p.productID and user_id=? and status=1', [user_id])

            return result
        } catch (error) {
            console.log('error', error)
        }
    },
    updateQuantity: async (id, quantity, total) => {
        try {
            let [check] = await connection.query('select quatity from cart where cartId=?', [id])
            let [checkunitstock] = await connection.query('select c.cartId,p.productName ,p.quantity,c.quatity  from cart c, products p where c.product_id =p.productID and c.cartId=?', [id]);
            console.log(checkunitstock[0].quantity)
            if (check[0].quatity != quantity && checkunitstock[0].quantity >= quantity && quantity > 0) {

                let [rs] = await connection.query('update cart set quatity=?, total=? where cartId=?', [quantity, total, id])

            }
            else {
                console.log('vuot qua hang trong kho')
            }
            return check
        }
        catch (error) {
            console.log('error', error)
        }
    },
    createCart: async (id, email, price) => {
        try {

            let [rs] = await connection.query('select user_id from res_users where email=?', [email])
            let user_id = rs[0].user_id

            let [check] = await connection.query('select product_id,quatity from cart where user_id=? and product_id=?', [user_id, id])
            if (check.length < 1) {

                let [result] = await connection.query('insert into cart(user_id,product_id,total) values (?,?,?)', [user_id, id, price])
            }
            else {
                let soluong = check[0].quatity
                soluong++;
                let total = soluong * price

                let [quantity] = await connection.query('update cart set quatity =?,total=? where user_id=? and product_id=?', [soluong, total, user_id, id])


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
            let [result] = await connection.query('select count(cartId) count from cart where user_id =? and status = 1', [user_id]);
            let count = result && result.length > 0 ? result[0] : {};

            return count
        } catch (error) {
            console.log('Error', error)
        }

    },
    checkquantity: async (id) => {
        try {
            let [result] = await connection.query('select c.cartId,p.productName ,p.quantity,c.quatity  from cart c, products p where c.product_id =p.productID and c.cartId=?', [id])
            return result
        } catch (error) {
            console.log(error)
        }
    }

}