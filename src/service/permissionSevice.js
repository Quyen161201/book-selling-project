const connection = require('../config/database');

module.exports = {
    getRoleUsers: async (email) => {
        try {
            let [userid] = await connection.query('select user_id from res_users where email=?', [email]);
            let user_id = userid[0].user_id

            let [role] = await connection.query('select * from res_users where user_id=?', [user_id]);
            return role;
        }
        catch (error) {
            console.log(error);
        }

    }
}