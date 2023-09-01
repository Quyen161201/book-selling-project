const { config } = require('dotenv')
const express = require('express') // import thư viện express
const path = require('path')
require('dotenv').config()
const configViewEngine = require('./config/viewEngine')
const connection = require('./config/database')
const webrouter = require('./route/web')
const fileUpload = require('express-fileupload')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const { checkSesssion } = require('./middleware/userMiddle')

const app = express() // tạo ra express app

const port = process.env.PORT // khai  báo port
const hostname = process.env.HOST_NAME
// default options
app.use(fileUpload());
// config req.body
app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true })) // for form data
//config template engine
configViewEngine(app)


// khai báo cookie
app.use(cookieParser());

//khai báp session
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: 'book store',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
}))

// khai báo route
app.use('/', webrouter)


// chạy sever 
app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`)
})
