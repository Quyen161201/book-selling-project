const connection = require('../config/database')
const getindex = async (req, res) => {
    // let results = await getAllusers()
    // console.log(results)
    return res.render('index.ejs')

}

const getDasboard = async (req, res) => {
    return res.render('admin-dashboard.ejs')

}
module.exports = { getindex, getDasboard }