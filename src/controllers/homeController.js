// const { Connection } = require('mysql2/typings/mysql/lib/Connection')
const connection = require('../config/database')
const { getAllusers, getUpdateuser, postCreateusers, postUpdateusers, postDelete } = require('../service/CRUDsevice')
const gethomepage = async (req, res) => {
    let results = await getAllusers()
    // console.log(results)
    return res.render('home.ejs', { listUsers: results })


}
const create = (req, res) => {
    res.render('create.ejs')
}
const createUser = async (req, res) => {
    let { Email, Myname, City } = req.body;
    postCreateusers(Email, Myname, City)
    res.send('Create user Success!')


    // connection.query(
    //     'INSERT INTO Users(email,name,city) VALUES (?,?,?)',
    //     [email, myname, address],
    //     function (err, results) {
    //         console.log(results);
    //         res.send('add users success')
    //     }
    // );

}
const getupdate = async (req, res) => {
    const userId = req.params.id
    let user = await getUpdateuser(userId)
    res.render('update.ejs', { updateUser: user });

}
const updateUser = async (req, res) => {
    let { Email, Myname, City } = req.body
    const userId = req.params.id
    postUpdateusers(Email, Myname, City, userId)

    res.redirect('/')
}
const deleteUser = async (req, res) => {
    const userId = req.params.id;
    let user = await getUpdateuser(userId)
    res.render('delete.ejs', { confirmDelete: user })

}
const postDeleteUser = async (req, res) => {
    const userId = req.params.id;
    postDelete(userId)
    res.redirect('/')

}
module.exports = {
    gethomepage, createUser, create, getupdate, updateUser, deleteUser, postDeleteUser
}