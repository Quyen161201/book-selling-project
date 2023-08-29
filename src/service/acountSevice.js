const connection = require('../config/database')
const bcrypt = require('bcrypt');

module.exports = {
    postRegisterSevice: async (data) => {
        try {
            let [result] = await connection.query('select email  from res_users where active =1 and email=?', [data.email])
            if (result.length < 1) {
                let [results] = await connection.query('insert  into res_users(lastname,email,password)values (?,?,?)', [data.fullname, data.email, data.password])
                return {
                    error: 0,
                    status: 'Đăng ký thành công',
                    dataRS: results
                }
            }
            else {
                return {
                    error: 1,
                    status: 'email đã tồ tại',

                }
            }


        } catch (error) {
            console.log(error)
        }
    },

    postLoginSevice: async (email, password) => {
        try {
            let [result] = await connection.query('select email,password  from res_users where active =1 and email=?', [email])

            if (result.length > 0) {
                const passw = result[0].password
                console.log(password)

                let check = await bcrypt.compare(password, passw); // true

                console.log(check, "ok")
            }
            else {
                return 'tai khoan mat khong k dung'
            }
        } catch (error) {

        }
    }
}