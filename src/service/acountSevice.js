const connection = require('../config/database')
const bcrypt = require('bcrypt');

module.exports = {

    postRegisterSevice: async (data) => {
        try {
            let [result] = await connection.query('select email  from res_users where active =1 and email=?', [data.email])
            if (result.length < 1) {
                let [results] = await connection.query('insert  into res_users(name,email,password)values (?,?,?)', [data.fullname, data.email, data.password])
                return {
                    error: 0,
                    status: 'Đăng ký thành công',
                    dataRS: results
                }
            }
            else {
                return {
                    error: 1,
                    status: 'email đã tồn tại',

                }
            }


        } catch (error) {
            console.log(error)
        }
    },

    postLoginSevice: async (email, password) => {
        try {
            let [check] = await connection.query('select email,password  from res_users where active =1 and email=?', [email])
            return check

        } catch (error) {
            console.log(error)
        }
    },


}