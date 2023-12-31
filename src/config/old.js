require('dotenv').config()
const mySql = require('mysql2')
const connection = mySql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    database: process.env.DB_NAME
});
module.exports = connection;