
const { createCart, getcartSevice, updateQuantity, deleteCartSevice, coutcartSevice, checkquantity } = require('../service/cartSevice')

module.exports = {
    getCart: async (req, res, next) => {
        let email = req.session.email
        let result = await getcartSevice(email)
        let count = await coutcartSevice(email)
        res.render('cart.ejs', { listcart: result, count: count })

        return result
    },
    postCart: async (req, res) => {
        let email = req.session.email
        let { product_id, name, price } = req.body
        let rs = await getcartSevice(email)
        let result = await createCart(product_id, email)
        if (!req.session.cart) {
            req.session.cart = []
        }
        let count = 0
        let quantity = rs.quatity

        for (let i = 0; i < req.session.cart.length; i++) {

            if (req.session.cart[i].product_id === product_id) {
                req.session.cart[i].quantity += 1
                count++;

            }
        }
        if (count == 0) {
            const data_cart = {
                product_id: product_id,
                product_name: name,
                price: price
            }
            req.session.cart.push(data_cart);
        }

        res.redirect('/getCart')
    },
    updateCart: async (req, res) => {
        let quantity = req.body.quantity
        console.log(quantity)
        let id = req.body.id
        let check = await checkquantity(id)
        let checkdata = check[0].quantity
        let result = await updateQuantity(id, quantity)
        let sendata = result[0].quatity
        return res.json({
            checkdata,
            sendata
        })
    },
    deleteCart: async (req, res) => {
        let id = req.params.id
        let rs = await deleteCartSevice(id)
        res.redirect('/getCart')
    }

}