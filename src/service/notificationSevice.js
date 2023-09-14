const connection = require('../config/database')
module.exports = {
    getnotifiSevice: async (email) => {
        try {
            let [user_id] = await connection.query('select user_id from res_users where email=?', [email]);
            let [check] = await connection.query('select user_id from notification where user_id=?', [user_id[0].user_id]);
            let [result] = await connection.query('select user_id,email_notifi from notification where user_id', [user_id[0].user_id]);
            return result
        } catch (error) {
            console.log(error);
        }
    },
    notificationSevice: async (email, status) => {
        try {
            let [user_id] = await connection.query('select user_id from res_users where email=?', [email]);
            let [check] = await connection.query('select user_id from notification where user_id=?', [user_id[0].user_id]);

            if (user_id != '') {

                if (check != '') {

                    let [rs] = await connection.query('update notification set email_notifi=?, update_at=now() where user_id=?', [status, user_id[0].user_id]);

                }
                else {
                    console.log(status, 'status')
                    let [create] = await connection.query('insert into notification(email_notifi,user_id,create_at) values(?,?,now())', [status, user_id[0].user_id]);

                }


            }
            else {
                console.log('update thất bại')
            }

        }
        catch (error) {
            console.log(error)
        }
    }
}