const { getListBook, getUpdateBookSevice, getListImageSevice } = require('../service/CRUDadminBook')
const { getProfile } = require('../service/profileSevice');
const { coutcartSevice, getcartSevice } = require('../service/cartSevice')
const { getPurchase, repurchaseService, updatePurchaseSevice } = require('../service/purchaseSevice');

module.exports = {
    getPurchase: async (req, res) => {
        let results = await getListBook()
        let user_id = req.data[0].user_id;
        let profile = await getProfile(user_id)
        let result = await getcartSevice(user_id)
        let count = await coutcartSevice(user_id)
        let listPuchases = await getPurchase(user_id);
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
        let user_id = req.data[0].user_id;
        let repurchase = req.body.repurchase
        let rs = await repurchaseService(user_id, repurchase)
        res.redirect('/getCart')
    },
    updatePurchaseAdmin: async (req, res) => {
        let id = req.params.id;
        let status = req.body.status;
        console.log(id, status)
        let result = await updatePurchaseSevice(id, status);
        console.log(result);
        res.redirect('/admin-dashboard');
    }
}