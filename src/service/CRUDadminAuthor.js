const { error } = require('console');
const connection = require('../config/database')
module.exports = {
    getAuthorService: async (id) => {
        try {
            let [result, fields] = await connection.query('select * from author where authorId=?', [id])
            let author = result && result.length > 0 ? result[0] : {};

            return author


        } catch (error) {
            console.log(error)
        }
    },
    postCreateAutorSevice: async (data) => {
        try {

            let [result, fields] = await connection.query('insert into author(authorName,description)  values(?,?)',
                [data.name, data.description])
            return result;
        }
        catch (error) {
            console.log(error)
        }
    },
    postUpdateAuthorSevice: async (data) => {
        try {
            let [check] = await connection.query('select * from author where authorId=?', [data.id])

            if (check != "") {
                console.log(check, 'okok>>>>')
                let [result] = await connection.query('update author Set authorName=?,description=? where authorId=?', [data.name, data.description, data.id])
                return result

            }
            else {
                console.log('k tồn tại bản ghi')
            }

        } catch (error) {

        }
    },
    postDeleteAuthorSevice: async (id) => {
        try {
            let [check] = await connection.query('select * from author where authorId=?', [id])

            if (check[0].authorId == id) {

                let [result] = await connection.query('delete from author where authorId=?', [id])
                return result

            }
            else {
                console.log(error)
            }

        } catch (error) {

        }
    }
}