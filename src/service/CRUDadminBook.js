const connection = require('../config/database')
//tạo sách
module.exports = {
    getlistCategorySevice: async (data) => {
        try {

            let [results, fields] = await connection.query('select*from category');
            return results
        }
        catch (error) {
            console.error(error)
        }
    },
    getlistAuthorSevice: async (data) => {
        try {

            let [results, fields] = await connection.query('select*from author');
            console.log('author', results)
            return results
        } catch (error) {
            console.log('err', error)
        }
    },
    getListImageSevice: async (productID) => {
        try {
            let [results, fields] = await connection.query('SELECT * FROM images where product_id= ?', [productID]);

            return results
        } catch (error) {
            console.log('err', error)
        }

    },
    getUpdateBookSevice: async (data) => {
        try {

            let [results, fields] = await connection.query('select* from products p left join author a on p.authorId =a.authorId left join category c ON p.categoryId =c.categoryId left join images i on p.productId =i.product_id where p.productID =? and p.is_deleted=0', [data]);
            let book = results && results.length > 0 ? results[0] : {};

            return book
        }
        catch (error) {
            console.log('err', error)
        }


    },
    postUpdateBookSevice: async (data) => {
        try {

            let check = await connection.query('select * from products where productID=?', [data.productID]);
            console.log(check[0][0], 'list check')


            if (check[0][0].is_deleted == 0) {

                let results = await connection.query('update products set productName=?,unitPrice=?,quantity=?,desciption=?,authorId=?,categoryId=?,bookPdf=? where productID=?'
                    , [data.name, data.price, data.quantity, data.desciption, data.author, data.category, data.bookPdf, data.productID]);
                console.log('id', results)
                //update image
                let arrImg = [data.image];
                console.log('arrImg', arrImg)
                let stringImg = arrImg.toString();
                let arrRs = stringImg.split(",");
                const image_values = []
                for (let i = 0; i < arrRs.length; i++) {
                    image_values.push([arrRs[i], data.productID]);
                }
                console.log('image_values', image_values)
                let deleteImg = await connection.query('delete from images where product_id=?', [data.productID]);
                let upadateImg = await connection.query('insert into images(name, product_id) values ?', [image_values])

                return results
            }
            else {
                console.log('k tồn tại bản ghi')
            }


        } catch (error) {
            console.log('err', error)
        }

    },

    getAdminBooksSevice: async (data) => {
        try {

            let [results, fields] = await connection.query
                ('select* from products p left join author a on p.authorId =a.authorId left join category c ON p.categoryId =c.categoryId left join images i on p.productId =i.product_id where is_deleted=0 group by productID ');

            return results;
        } catch (error) {
            console.log('err', error)
        }
    },
    postCreateBookSevice: async (data) => {
        try {
            let arrImg = [data.image];
            console.log('arrImg', arrImg)
            let stringImg = arrImg.toString();
            let arrRs = stringImg.split(",");
            let results = await connection.query('insert into products(productName,price_root,unitPrice,quantity,desciption,authorId,categoryId,bookPdf) VALUES (?,?,?,?,?,?,?,?)'
                , [data.name, data.price_root, data.price, data.quantity, data.desciption, data.author, data.category, data.bookPdf]);
            console.log('rsult', results)
            console.log('>>>>rss', results[0].insertId)
            let new_id = results[0].insertId;
            // let dataImages = "";
            const image_values = [];
            for (let i = 0; i < arrRs.length; i++) {
                // if (i < arrRs.length - 1)
                //     dataImages += `('${arrRs[i]}'),`;
                // else dataImages += `('${arrRs[i]}')`;
                image_values.push([arrRs[i], new_id]);

            }

            console.log(arrRs);
            // const image_values = [
            //     arrRs
            // ]
            // console.log("dataimages", dataImages)
            let [resultsImg, fieldsImg] = await connection.query('insert into images(name, product_id) values ?', [image_values], function (e) {
                console.log("values: ", e);
            })
            return results
        }
        catch (error) {
            console.log('>>error', error)
        }
    },
    postAdminDeleteSevice: async (productID) => {
        try {
            let check = await connection.query('select * from products where productID=?', [productID]);
            console.log(check, 'check')
            if (check[0][0].is_deleted == 0) {
                let [results, fields] = await connection.query('update products set is_deleted = 1 WHERE productID=?', [productID]);
                let resultImg = await connection.query('delete from images where product_id=?', [productID])
                return results;
            }
            else {
                console.log('Product k tồn tại')
            }
        } catch (error) {
            console.log('erorr', error)
        }
    }

}

