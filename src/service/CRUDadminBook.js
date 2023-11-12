const connection = require('../config/database')
//tạo sách
module.exports = {
    getListBook: async () => {
        try {
            let [results] = await connection.query('select * from author a , products p where a.authorId =p.authorId and p.is_deleted = 0');


            // let [results] = await connection.query('select categoriesName from product_category,category where product_category.category_id=category.categoryId ');
            // let cate_values = results && results.length > 0 ? results[0] : {};

            return results
        }
        catch (error) {
            console.error(error)
        }

    },
    getlistCategorySevice: async () => {
        try {
            let [results] = await connection.query('select * from category');

            // let [results] = await connection.query('select categoriesName from product_category,category where product_category.category_id=category.categoryId ');
            // let cate_values = results && results.length > 0 ? results[0] : {};

            return results
        }
        catch (error) {
            console.error(error)
        }
    },
    getlistAuthorSevice: async (data) => {
        try {

            let [results, fields] = await connection.query('select*from author');

            return results
        } catch (error) {
            console.log('err', error)
        }
    },
    getListImageSevice: async (productID) => {
        try {
            let [results, fields] = await connection.query('SELECT name FROM images where product_id= ?', [productID]);

            return results
        } catch (error) {
            console.log('err', error)
        }

    },
    getCategory: async (id) => {
        try {
            let [results] = await connection.query('select * from category c , product_category pc where c.categoryId =pc.category_id and pc.product_id = ?', [id]);
            // let category = results && results.length > 0 ? results[0] : {};

            return results
        } catch (error) {

        }
    },
    getUpdateBookSevice: async (data) => {
        try {

            let [results, fields] = await connection.query('select* from products p left join author a on p.authorId =a.authorId left join images i on p.productId =i.product_id where p.productID =? and p.is_deleted=0', [data]);

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


            if (check[0][0].is_deleted == 0) {
                //product
                let [results] = await connection.query('update products set productName=?,unitPrice=?,quantity=?,desciption=?,authorId=?,bookPdf=?,thumbnail=? where productID=?'
                    , [data.name, data.price, data.quantity, data.desciption, data.author, data.bookPdf, data.image, data.productID]);

                //category
                let category = [data.category];
                let stringCate = category.toString();
                let arrCate = stringCate.split(",");
                const cate_values = []
                for (let i = 0; i < arrCate.length; i++) {
                    cate_values.push([data.productID, arrCate[i]]);
                }
                let deleteCate = await connection.query('delete from product_category where product_id=?', [data.productID])
                let rsCategory = await connection.query('insert into product_category(product_id,category_id) values ?', [cate_values])

                //update image
                let arrImg = [data.gallery];

                let stringImg = arrImg.toString();
                let arrRs = stringImg.split(",");
                const image_values = []
                for (let i = 0; i < arrRs.length; i++) {
                    image_values.push([arrRs[i], data.productID]);
                }
                if (arrImg.length > 0) {

                    let deleteImg = await connection.query('delete from images where product_id=?', [data.productID]);
                    let upadateImg = await connection.query('insert into images(name, product_id) values ?', [image_values])
                }
                else { console.log('>>>> không có ảnh') }

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
                ('select* from products p left join author a on p.authorId =a.authorId left join images i on p.productId =i.product_id where is_deleted=0 group by productID ');

            return results;
        } catch (error) {
            console.log('err', error)
        }
    },
    postCreateBookSevice: async (data) => {
        try {
            //category

            let category = [data.category];
            let stringCate = category.toString();
            let arrCate = stringCate.split(",");
            //image
            let arrImg = [data.gallery];
            let stringImg = arrImg.toString();
            let arrRs = stringImg.split(",");

            // create product
            let results = await connection.query('insert into products(productName,price_root,unitPrice,quantity,desciption,authorId,bookPdf,thumbnail) VALUES (?,?,?,?,?,?,?,?)'
                , [data.name, data.price_root, data.price, data.quantity, data.desciption, data.author, data.bookPdf, data.image]);


            let new_id = results[0].insertId;

            const cate_values = []
            for (let i = 0; i < arrCate.length; i++) {
                cate_values.push([new_id, arrCate[i]]);
            }
            let [rsCategory] = await connection.query('insert into product_category(product_id,category_id) values ?', [cate_values])


            // let dataImages = "";
            const image_values = [];

            for (let i = 0; i < arrRs.length; i++) {

                image_values.push([arrRs[i], new_id]);

            }


            let [resultsImg, fieldsImg] = await connection.query('insert into images(name, product_id) values ?', [image_values], function (e) {

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

