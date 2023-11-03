module.exports = {
    orderContact: async (req, res) => {
        const id = req.body.id
        req.session.idContact = id;
        res.send('ok')
    }
}