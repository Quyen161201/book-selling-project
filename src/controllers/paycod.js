module.exports = {
    createCod: async (req, res) => {
        let a = req.body.paycod;
        console.log('payment', a);
        res.send('ok')
    }
}