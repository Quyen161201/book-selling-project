

const { notificationSevice } = require('../service/notificationSevice')

module.exports = {
    notifycation: async (req, res, next) => {
        let checkmail = req.body.payload;
        let status = '';
        checkmail == true ? status = '1' : status = '0';
        let user_id = req.data[0].user_id;
        let rs = await notificationSevice(user_id, status);
    }
}