const connection = require('../config/database')
module.exports = {
    getnotifiSevice: async (user_id) => {
        try {
            let [result] = await connection.query('select user_id,email_notifi from notification where user_id', [user_id]);
            return result
        } catch (error) {
            console.log(error);
        }
    },
    notificationSevice: async (user_id, status) => {
        try {
            let [check] = await connection.query('select user_id from notification where user_id=?', [user_id]);

            if (user_id != '') {

                if (check != '') {

                    let [rs] = await connection.query('update notification set email_notifi=?, update_at=now() where user_id=?', [status, user_id]);

                }
                else {
                    console.log(status, 'status')
                    let [create] = await connection.query('insert into notification(email_notifi,user_id,create_at) values(?,?,now())', [status, user_id]);

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