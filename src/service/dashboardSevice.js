const connection = require('../config/database')

module.exports = {
    dashboardSevice: async () => {
        try {
            let objDashboard = {};
            let [count_user] = await connection.query('select count(*) as "users" from res_users ru;');
            let [count_product] = await connection.query('select count(*) as "product" from products');
            let [count_order] = await connection.query('select count(*) as "order" from orderdetails o  ');
            let [list_bill] = await connection.query('select cc.name, o.create_at ,o.status ,o.invoice ,o.totalOrder  from orderdetails o,contact_customer cc where  o.contact_id =cc.id')
            return objDashboard = { count_user, count_product, count_order, list_bill }
        }
        catch (error) {
            console.log(error)
        }


    }
}