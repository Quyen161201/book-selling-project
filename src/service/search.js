const connection = require('../config/database')
module.exports = {
    searchProductSevice: async (payload) => {
        let [rs] = await connection.query('select productID,productName,thumbnail from products where productName like ? and is_deleted=0 ', ['%' + payload + '%']);
        return rs
    }
}