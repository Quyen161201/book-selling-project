const connection = require('../config/database')
module.exports = {
    updateVeryfiSevice: async (email) => {
        try {
            let [result] = await connection.query('update res_users set veryfi_email=now() where email=? and active=1', [email])
            return result
        } catch (error) {
            console.log(error)
        }

    }
}