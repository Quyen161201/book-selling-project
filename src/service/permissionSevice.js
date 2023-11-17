const connection = require('../config/database');

module.exports = {
    getRoleUsers: async (user_id) => {
        try {
            console.log('id', user_id);
            let [role] = await connection.query('select * from res_users where user_id=?', [user_id]);
            return role;
        }
        catch (error) {
            console.log(error);
        }

    }
}