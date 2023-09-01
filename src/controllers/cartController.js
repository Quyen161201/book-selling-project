
const { createCart, getcartSevice } = require('../service/cartSevice')

module.exports = {
    getCart: async (req, res) => {
        let email = req.session.email
        let result = await getcartSevice(email)

        console.log(email, 'email')

        res.render('cart.ejs', { listcart: result })
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
        console.log('quantity:', rs)
        for (let i = 0; i < req.session.cart.length; i++) {

            if (req.session.cart[i].product_id === product_id) {
                req.session.cart[i].quantity += 1
                count++;
                console.log('req.session.cart[i].quantity', req.session.cart[i].quantity)
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
        console.log(req.session.cart.product_id, 'ok')
        res.redirect('/getCart')
    }
}