const connection = require('../config/database')
//tạo sách
module.exports = {
    getlistCategorySevice: async (data) => {
        let [results, fields] = await connection.query('select*from category');
        return results
    },
    getlistAuthorSevice: async (data) => {
        let [results, fields] = await connection.query('select*from author');
        return results
    },
    postCreateBookSevice: async (data) => {
        try {
            let [resultsImg, fieldsImg] = await connection.query('insert into images(name) values(?)', [data.image])
            let [results, fields] = await connection.query('insert into products(productName,unitPrice,quantity,desciption,authorId,image_id,categoryId,bookPdf) VALUES (?,?,?,?,(select authorId from author where name=?),(select image_id from images where name=?),(select categoryId from category where name=?),?)', [data.name, data.price, data.quantity, data.desciption, data.author, data.image, data.category, data.bookPdf]);

            return { results, resultsImg }
        } catch (error) {
            console.log('>>error', error)
        }
    }

}

