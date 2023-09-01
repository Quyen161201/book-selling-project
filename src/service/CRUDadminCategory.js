const connection = require('../config/database')
module.exports = {
    getAdimCategory: async () => {
        try {
            let [result, fields] = await connection.query('select * from category');
            // let [rsUpdate] = await connection.query('select * from category where categoryId=?', [id])

            return { result: result, }

        } catch (error) {
            console.log('err', error)
        }
    },
    adimCategoryCreate: async (name) => {
        try {
            let [result, fields] = await connection.query('INSERT INTO category(categoriesName) values (?)', [name])

            return result

        } catch (error) {
            console.log('err', error)
        }
    },
    getUpdateCategory: async (id) => {
        try {

            let [result] = await connection.query('select * from category where categoryId=?', id);
            let category = result && result.length > 0 ? result[0] : {};

            return category

        } catch (error) {
            console.log('err', error)
        }
    },
    postUpdateCategory: async (name, id) => {
        try {
            let [check] = await connection.query('select * from category where categoryId=?', [id]);

            if (check != "") {

                let [result] = await connection.query('update category set categoriesName=? where categoryId=?', [name, id]);
            }
            else {
                console.log('k tồn tại bản ghi')
            }
            return result

        } catch (error) {
            console.log('err', error)
        }
    },
    postDeleteAuthorSevice: async (id) => {
        try {
            let [check] = await connection.query('select * from category where categoryId=?', [id])

            if (check[0].categoryId == id) {

                let [result] = await connection.query('delete from category where categoryId=?', [id])
                return result

            }
            else {

            }

        } catch (error) {
            console.log(error)
        }
    }
}