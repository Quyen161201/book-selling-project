const { config } = require('dotenv')
const express = require('express') // import thư viện express
const path = require('path')
require('dotenv').config()
const configViewEngine = require('./config/viewEngine')
const connection = require('./config/database')
const webrouter = require('./route/web')
const app = express() // tạo ra express app
const port = process.env.PORT // khai  báo port
const hostname = process.env.HOST_NAME
// config req.body
app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true })) // for form data
//config template engine
configViewEngine(app)

// khai báo route
app.use('/', webrouter)
// chạy sever 
app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`)
})