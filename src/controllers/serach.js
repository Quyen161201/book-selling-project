const connection = require('../config/database')
const { searchProductSevice } = require('../service/search')

module.exports = {
    searchProduct: async (req, res) => {
        let payload = req.body.payload.trim();
        let rs = await searchProductSevice(payload)
        res.send({ payload: rs })

    }
}