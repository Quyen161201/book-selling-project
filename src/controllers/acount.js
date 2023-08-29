const { postRegisterSevice, postLoginSevice } = require('../service/acountSevice')
const bcrypt = require('bcrypt');
module.exports = {
    getRegister: async (req, res) => {
        res.render('sign-up.ejs')
    },
    postRegister: async (req, res) => {
        let { fullname, email, password } = req.body.data
        const hashedPassword = await bcrypt.hash(password, 10);

        let data = { fullname, email, password: hashedPassword }

        let rs = await postRegisterSevice(data)

        return res.json(rs)

    },
    getLogin: async (req, res, next) => {
        res.render('sign-in.ejs')
    },
    postLogin: async (req, res) => {
        let { email, password } = req.body.data
        let rs = await postLoginSevice(email, password)



    }
}