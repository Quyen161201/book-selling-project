
const { notificationSevice } = require('../service/notificationSevice')

module.exports = {
    notifycation: async (req, res, next) => {
        let checkmail = req.body.payload;
        let status = '';
        checkmail == true ? status = '1' : status = '0';
        let email = req.session.email;
        let rs = await notificationSevice(email, status);
    }
}