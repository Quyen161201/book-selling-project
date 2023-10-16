const connection = require('../config/database')
module.exports = {
    getProfile: async (email) => {
        let [userid] = await connection.query('select user_id from res_users where email=?', [email])
        let user_id = userid[0].user_id
        let [result] = await connection.query('select * from customers c, res_users r where c.user_id=r.user_id and c.user_id =?', [user_id]);

        let profile = result && result.length > 0 ? result[0] : {};

        return profile
    },
    getContactSevice: async (email) => {
        try {
            if (email) {
                let [result] = await connection.query('select phone from res_users where email=?', [email])
                let contact = result && result.length > 0 ? result[0] : {};
                return contact;
            }
            else { }
        } catch (error) {
            console.log(error)
        }
    },
    createProfile: async (data) => {
        try {
            let [userid] = await connection.query('select user_id from res_users where email=?', [data.email])
            let user_id = userid[0].user_id
            let [deleteid] = await connection.query('delete from customers where user_id=?', [user_id]);
            let [result] = await connection.query('insert into customers(user_id,firstname,lastname,city,address,district,thumbnail,birddate,sex,ward) values (?,?,?,?,?,?,?,?,?,?)',
                [user_id, data.fname, data.lname, data.city, data.address, data.district, data.thumbnail, data.date, data.customRadio1, data.ward]);
            let [updateName] = await connection.query('update res_users set name = ? where user_id =?', [data.username, user_id]);

            return result
        }
        catch (error) {
            console.log(error)
        }
    },

    updatePassSevice: async (data) => {
        try {
            let [updatepass] = await connection.query('update res_users set password=?  where active =1 and email=?', [data.npass, data.email]);
            return updatepass


        }
        catch (error) {

        }
    },
    updateContactSevice: async (email, phone, checkemail) => {
        try {

            console.log(checkemail, 'checkemail')
            let [checkmail] = await connection.query('select email from res_users where email=? limit 1', [email]);
            let [checkphone] = await connection.query('select phone from res_users where  phone=? limit 1', [phone]);

            if (checkmail == '' && checkphone == '') {
                let [result] = await connection.query('update res_users set email=?,phone=? where active =1 and email=?', [email, phone, checkemail]);
                return result
            }
            else {
                console.log('email hoac dt da ton tai')
            }


        }
        catch (error) {
            console.log(error)
        }
    },
    createContactSevice: async (data) => {
        try {
            let [userid] = await connection.query('select user_id from res_users where email=?', [data.email]);
            let user_id = userid[0].user_id;

            let [customerid] = await connection.query('select id from customers where user_id=?', [user_id]);
            const customer_id = customerid[0].id;


            let [result] = await connection.query('insert into contact_customer(address,district,ward,city,customer_id,phone,name,create_at) values(?,?,?,?,?,?,?,now())', [data.address, data.district, data.ward, data.city, customer_id, data.phone, data.fname]);
            return result


        }
        catch (error) {
            console.log(error);
        }
    },
    getContactsSevice: async (email) => {
        let [userid] = await connection.query('select user_id from res_users where email=?', [email]);
        let user_id = userid[0].user_id;

        let [customerid] = await connection.query('select id from customers where user_id=?', [user_id]);
        const customer_id = customerid[0].id;
        let [result] = await connection.query('select * from contact_customer where customer_id=?', [customer_id])

        return result;
    }





}