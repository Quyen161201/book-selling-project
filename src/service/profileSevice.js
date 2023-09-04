const connection = require('../config/database')
module.exports = {
    getProfile: async (email) => {
        let [userid] = await connection.query('select user_id from res_users where email=?', [email])
        let user_id = userid[0].user_id
        let [result] = await connection.query('select * from customers c, res_users r where c.user_id=r.user_id and c.user_id =?', [user_id])
        console.log(result)
        let profile = result && result.length > 0 ? result[0] : {};
        return profile
    },
    createProfile: async (data) => {
        try {
            let [userid] = await connection.query('select user_id from res_users where email=?', [data.email])
            let user_id = userid[0].user_id
            let [deleteid] = await connection.query('delete from customers where user_id=?', [user_id]);
            let [result] = await connection.query('insert into customers(user_id,firstname,lastname,city,address,district,thumbnail,birddate,sex,ward) values (?,?,?,?,?,?,?,?,?,?)',
                [user_id, data.fname, data.lname, data.city, data.address, data.district, data.thumbnail, data.date, data.customRadio1, data.ward]);
            let [updateName] = await connection.query('update res_users set name = ? where user_id =?', [data.username, user_id]);

            return result
        }
        catch (error) {
            console.log(error)
        }
    }
}