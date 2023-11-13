
const { createCart, getcartSevice, updateQuantity, deleteCartSevice, coutcartSevice, checkquantity } = require('../service/cartSevice')
const { getProfile, getContactsSevice, createContactSevice, deleteContactSevice } = require('../service/profileSevice');

module.exports = {
    getCart: async (req, res, next) => {
        let email = req.session.email
        let profile = await getProfile(email)
        let result = await getcartSevice(email)
        let count = await coutcartSevice(email)
        let contact = await getContactsSevice(email)
        res.render('cart.ejs', { profile: profile, listcart: result, count: count, contact: contact });

        return result
    },
    postCart: async (req, res) => {
        let email = req.session.email
        let { product_id, name, price } = req.body

        price = price.replace(/,|₫/g, '').trim();

        let rs = await getcartSevice(email)
        let result = await createCart(product_id, email, price)
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
        let price = req.body.price;

        let id = req.body.id
        let total = quantity * price
        let check = await checkquantity(id)
        let checkdata = check[0].quantity
        let result = await updateQuantity(id, quantity, total);
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
    },
    postContact: async (req, res) => {
        let email = req.session.email
        let { address, fname, phone, city, district, ward } = req.body
        let data = { address, fname, phone, city, district, ward, email }
        let rs = await createContactSevice(data)

        res.redirect('/getCart');
    },

    deleteContact: async (req, res) => {
        const id = req.params.id;
        let rs = await deleteContactSevice(id);
        res.redirect('/getCart');
    }


}