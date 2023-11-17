var jwt = require('jsonwebtoken');
const { getRoleUsers } = require('../service/permissionSevice');
const { type } = require('os');

module.exports = {
    checkLogin: async (req, res, next) => {
        let token = req.session.tokenLogin
        if (typeof token === 'undefined') {
            res.redirect('/adminLogin')
        }
        else {

            ;
            let user_id = jwt.verify(token, 'mk');

            let id = user_id.user_id
            let data = await getRoleUsers(id);

            if (typeof data === 'undefined') {

                res.redirect('/adminLogin')
            }
            else {
                req.data = data;

                next()

            }
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
