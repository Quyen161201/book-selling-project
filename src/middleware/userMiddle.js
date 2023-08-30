module.exports = {
    checkSesssion: async (req, res, next) => {
        if (typeof req.session.email === 'undefined') {
            res.redirect('/adminLogin')
        }
        else {
            next()
        }
    }

}
