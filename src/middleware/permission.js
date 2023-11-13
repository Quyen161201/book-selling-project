
const { getRoleUsers } = require('../service/permissionSevice')

module.exports = {
    checkLogin: async (req, res, next) => {
        let email = req.session.email;
        let data = await getRoleUsers(email);

        if (typeof req.session.email === 'undefined') {
            res.redirect('/adminLogin')
        }
        else {
            req.data = data;
            next()
        }
    },
    checkPermissionAdmin: async (req, res, next) => {

        if (req.data[0].role >= 1) next();
        else {

            res.send('ban khong co quyen truy cap')
        }

    },
    checkPermissionUser: async (req, res, next) => {
        if (req.data[0].role <= 1) next();
        else {

            res.send('ban khong co quyen truy cap')
        }
    }

}
