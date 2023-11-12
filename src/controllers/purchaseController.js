const { getListBook, getUpdateBookSevice, getListImageSevice } = require('../service/CRUDadminBook')
const { getProfile } = require('../service/profileSevice');
const { coutcartSevice, getcartSevice } = require('../service/cartSevice')
const { getPurchase, repurchaseService } = require('../service/purchaseSevice');

module.exports = {
    getPurchase: async (req, res) => {
        let results = await getListBook()
        let email = req.session.email
        let profile = await getProfile(email)
        let result = await getcartSevice(email)
        let count = await coutcartSevice(email)
        let listPuchases = await getPurchase(email);
        console.log('puchases', listPuchases.puchase_product)

        const groupedPurchases = listPuchases.puchase_product.reduce((acc, purchase) => {
            const orderId = purchase.orderId;
            if (!acc[orderId]) {
                acc[orderId] = [];
            }
            acc[orderId].push(purchase);
            return acc;
        }, {});

        const newArrPurchase = Object.values(groupedPurchases);

        console.log(newArrPurchase);

        res.render('purchase.ejs', { listImg: results, profile: profile, listcart: result, count: count, puchase_product: newArrPurchase })
    },
    repurchase: async (req, res) => {
        let email = req.session.email;
        let repurchase = req.body.repurchase
        let rs = await repurchaseService(email, repurchase)
        res.redirect('/getCart')
    }
}