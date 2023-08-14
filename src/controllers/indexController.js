const connection = require('../config/database')
const getindex = async (req, res) => {
    // let results = await getAllusers()
    // console.log(results)
    return res.render('index.ejs')


}
module.exports = { getindex }