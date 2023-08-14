const connection = require('../config/database')
const getAllusers = async () => {
    let [results, fields] = await connection.query('SELECT * FROM Users')
    return results
}
const postCreateusers = async (Email, Myname, City) => {
    let [results, fields] = await connection.query('INSERT INTO Users(email,name,city) VALUES (?,?,?)', [Email, Myname, City])
    return results
}
const getUpdateuser = async (userId) => {

    let [results, fields] = await connection.query('SELECT * FROM Users where id=?', [userId]);
    let user = results && results.length > 0 ? results[0] : {};
    return user;
}
const postUpdateusers = async (Email, Myname, City, userId) => {
    let [results, fields] = await connection.query
        ('UPDATE Users SET email=?,name=?,city=? WHERE id=?', [Email, Myname, City, userId])
    return results
}
const postDelete = async (userId) => {
    let [results, fields] = await connection.query('DELETE FROM Users WHERE id=?', [userId])

}
module.exports = { getAllusers, getUpdateuser, postCreateusers, postUpdateusers, postDelete }